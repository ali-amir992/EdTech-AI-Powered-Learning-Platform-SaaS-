import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { getAllCourses } from "@/services/operations/Course";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { Link } from "react-router-dom";

export default function Home() {
    const dispatch = useAppDispatch();
    const courses = useSelector((state: RootState) => state.course.courses);

    useEffect(() => {
        dispatch(getAllCourses());
    }, []);

    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-1 container px-12 py-8">
                <h1 className="text-4xl font-bold mb-6">Welcome to MetaDots</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    AI-powered learning platform for the modern student
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <Link to={`/courses/${course._id}`} key={course._id}>
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                                    {/* Thumbnail Image */}
                                    <div className="aspect-video bg-muted relative">
                                        <img
                                            src={course.thumbnail} // Use the course thumbnail URL
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{course.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {course.description}
                                        </p>
                                        {/* Display Price */}
                                        <p className="text-lg font-bold text-primary">
                                            ${course.price}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No courses available</p>
                    )}
                </div>
            </main>
        </div>
    );
}