import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { getCourseById, Course } from "@/services/operations/Course";

export default function CourseDetail() {


    const { courseId } = useParams(); // Get courseId from URL params
    const [course, setCourse] = useState<Course | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourse() {
            if (!courseId) return;

            setLoading(true);
            const courseData = await getCourseById(courseId);
            setCourse(courseData);
            setLoading(false);
        }

        fetchCourse();
    }, [courseId]);
    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isAuthenticated={false} />
            <main className="container px-12 py-8">
                {course ? (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                        <p className="text-lg text-muted-foreground">{course.description}</p>
                        <p className="mt-4 font-semibold">Price: ${course.price}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Course not found</p>
                )}
            </main>
        </div>
    );
}
