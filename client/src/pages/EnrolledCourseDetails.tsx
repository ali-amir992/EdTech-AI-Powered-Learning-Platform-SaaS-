import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICourse } from "@/types/Course";
import { ISection } from "@/types/Section";
import { ILesson } from "@/types/Lesson";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import ReactPlayer from "react-player";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [course, setCourse] = useState<ICourse | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(data.course);
      } catch (error) {
        console.error("Failed to fetch course details", error);
      }
    };

    fetchCourse();
  }, [courseId, token]);
  console.log(course)
  return (
    <div>
      {course ? (
        <div>
          <h2>{course.title}</h2>
          <p>{course.description}</p>

          <div className="grid grid-cols-3 gap-4">
            {course.sections && course.sections.length > 0 ? (
              course.sections.map((section: ISection) => (
                <div key={section._id} className="border p-4">
                  <h3>{section.title}</h3>
                  <ul>
                    {section.lessons && section.lessons.length > 0 ? (
                      section.lessons.map((lesson: ILesson) => (
                        <li key={lesson._id} onClick={() => setSelectedLesson(lesson)}>
                          🎥 {lesson.title}
                        </li>
                      ))
                    ) : (
                      <p>No lessons available</p>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>No sections available</p>
            )}
          </div>

          {selectedLesson && (
            <div className="mt-4">
              <h3>Now Watching: {selectedLesson.title}</h3>
              <ReactPlayer url={`http://localhost:5000${selectedLesson.videoUrl}`} controls width="100%" />
            </div>
          )}
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetails;