import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { DashboardLayout } from '../dashboard-layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EnrolledCourses = () => {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user || !user.courses.length) return;

            try {
                const { data } = await axios.post(
                    'http://localhost:5000/api/v1/course/enrolledCourses',
                    { courseIds: user.courses },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Attach token in headers
                            "Content-Type": "application/json", // Ensure JSON content type
                        },
                    }
                );

                setEnrolledCourses(data);
            } catch (error) {
                console.error('Failed to fetch courses', error);
            }
        };

        fetchCourses();
    }, [user]);

    return (
        <DashboardLayout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
                {enrolledCourses.length > 0 ? (
                    <ul className="space-y-4">
                        {enrolledCourses.map((course) => (
                            <li key={course._id} className="border p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-gray-600">Instructor: {course.instructor.name}</p>
                                <a href={`/enrolledCourses/${course._id}`} className="text-blue-500 hover:underline">View Course</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You are not enrolled in any courses.</p>
                )}
            </div>
        </DashboardLayout>
    );
};

export default EnrolledCourses;
