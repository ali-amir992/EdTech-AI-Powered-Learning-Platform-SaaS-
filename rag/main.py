import os
from fastapi import FastAPI, HTTPException
import logging
from pinecone import Pinecone, ServerlessSpec
import numpy as np
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from typing import List, Dict, Any
import pprint

load_dotenv()
app = FastAPI()


# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Pinecone setup
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pc = Pinecone(api_key = pinecone_api_key)

index_name = "course-tutor"

# Check if the index already exists
if index_name not in pc.list_indexes().names():
    # Create the index if it doesn't exist
    pc.create_index(
        name=index_name,
        dimension=384,  # Replace with your model dimensions (e.g., 384 for all-MiniLM-L6-v2)
        metric="cosine",  # Replace with your model metric
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

# Connect to the index
index = pc.Index(index_name)

# To generate embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")

# Configure Gemini API
GENAI_API_KEY = os.getenv("GENAI_API_KEY")
genai.configure(api_key=GENAI_API_KEY)

def ask_gemini(prompt: str):
    gemini_model = genai.GenerativeModel("gemini-2.0-flash") 
    response = gemini_model.generate_content(prompt)
    return response.text  # Extract text response


# Request Data Models
class LessonModel(BaseModel):
    title: str = Field(..., description="Title of the lesson")
    description: str = Field(..., description="Description of the lesson")
    transcript: str = Field(default="", description="Transcript of the lesson")

class SectionModel(BaseModel):
    title: str = Field(..., description="Title of the section")
    lessons: List[LessonModel] = Field(..., description="List of lessons in the section")


class InstructorModel(BaseModel):
    about: str = Field(default="", description="About the instructor")

class CourseModel(BaseModel):
    course: Dict[str, Any] = Field(..., description="Course details")
    sections: List[SectionModel] = Field(..., description="List of sections in the course")
    instructor: InstructorModel = Field(..., description="Instructor details")


def generate_embedding(text: str) -> List[float]:
    return model.encode(text).tolist()


# Updated /store-course to store more metadata
@app.post("/store-course")
async def store_course(course_data: CourseModel):
    try:
        course_id = course_data.course["title"].replace(" ", "_").lower()
        course_text = f"Course: {course_data.course['title']}\nDescription: {course_data.course['description']}"
        course_embedding = generate_embedding(course_text)

        # Store course embedding
        index.upsert([
            (course_id, course_embedding, {
                "type": "course",
                "course_id": course_id,
                "course_title": course_data.course["title"],
                "instructor_about": course_data.instructor.about
            })
        ])

        # Embed and store lessons with description and transcript
        for section in course_data.sections:
            for lesson in section.lessons:
                lesson_text = f"Lesson: {lesson.title}\nDescription: {lesson.description}\nTranscript: {lesson.transcript}"
                lesson_embedding = generate_embedding(lesson_text)
                lesson_id = f"{course_id}_lesson_{lesson.title.replace(' ', '_').lower()}"

                index.upsert([
                    (lesson_id, lesson_embedding, {
                        "type": "lesson",
                        "course_id": course_id,
                        "course_title": course_data.course["title"],
                        "section_title": section.title,
                        "lesson_title": lesson.title,
                        "description": lesson.description,
                        "transcript": lesson.transcript
                    })
                ])

        logger.info("Course and lessons stored in Pinecone!")
        return {"message": "Course and lessons stored in Pinecone!"}
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Updated search_within_course with consistent filter
def search_within_course(query: str, course_id: str, top_k=5):
    query_vector = generate_embedding(query)
    results = index.query(
        vector=query_vector,
        filter={"course_id": {"$eq": course_id}},  # Use course_id for consistency
        top_k=top_k,
        include_metadata=True,
        include_values=False
    )
    print("Search results:", results)
    return results["matches"]


@app.get("/search-course/", summary="Search within a specific course", response_model=dict)
def search_course(query: str, course_id: str):
    try:
        results = search_within_course(query, course_id)
        return {"results": results}
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
# Updated /ask-course to handle course vs lesson matches
class AskCourseRequest(BaseModel):
    query: str
    course_id: str

@app.post("/ask-course/", summary="Ask a question about a course", response_model=dict)
def ask_course(request : AskCourseRequest):
    try:
        query = request.query
        course_id = request.course_id
        results = search_within_course(query, course_id)
        
        if not results:
            return {
                "status": "success",
                "answer": "No relevant information found in the course.",
                "context": ""
            }

        context_parts = []
        for match in results:
            metadata = match.get('metadata', {})
            entry_type = metadata.get('type', 'unknown')
            
            if entry_type == "course":
                context_parts.append(
                    f"Course: {metadata.get('course_title', 'Unknown title')}\n"
                    f"Instructor Info: {metadata.get('instructor_about', 'No instructor info available')}"
                )
            elif entry_type == "lesson":
                context_parts.append(
                    f"Lesson: {metadata.get('lesson_title', 'Unknown lesson')}\n"
                    f"Section: {metadata.get('section_title', 'Unknown section')}\n"
                    f"Description: {metadata.get('description', 'No description available')}\n"
                    f"Transcript: {metadata.get('transcript', 'No transcript available')}"
                )
            else:
                context_parts.append(f"Unknown entry type: {metadata}")

        context = "\n\n".join(context_parts)
        prompt = f"Using only this context from the course '{course_id}':\n\n{context}\n\nAnswer the question: {query}\n\nAnswer:"
        answer = ask_gemini(prompt)

        pprint.pprint(answer)
        return {
            "status": "success",
            "answer": answer,
            "context": context
        }
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "AI-Powered Tutor API is running well"}





