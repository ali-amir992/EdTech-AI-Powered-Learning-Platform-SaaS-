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

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {course ? (
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-lg text-gray-600">{course.description}</p>
          </div>

          {/* Sections and Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.sections && course.sections.length > 0 ? (
              course.sections.map((section: ISection) => (
                <div key={section._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.lessons && section.lessons.length > 0 ? (
                      section.lessons.map((lesson: ILesson) => (
                        <li
                          key={lesson._id}
                          onClick={() => setSelectedLesson(lesson)}
                          className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-blue-500 mr-2">🎥</span>
                          <span className="text-gray-700">{lesson.title}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">No lessons available</p>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No sections available</p>
            )}
          </div>

          {/* Selected Lesson Video Player */}
          {selectedLesson && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Now Watching: {selectedLesson.title}</h3>
              <div className="aspect-video">
                <ReactPlayer
                  url={`http://localhost:5000${selectedLesson.videoUrl}`}
                  controls
                  width="100%"
                  height="100%"
                  className="rounded-lg overflow-hidden"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Loading course details...</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;