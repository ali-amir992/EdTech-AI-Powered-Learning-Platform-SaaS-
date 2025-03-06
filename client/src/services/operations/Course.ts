import { toast } from "react-hot-toast";
import { setLoading } from "@/store/slices/courseSlice";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import { Dispatch } from "@reduxjs/toolkit";
import { setCourses } from "@/store/slices/courseSlice";
import { ICourse } from "@/types";

// Define API Response Shape
interface GetCoursesResponse {
  data: {
    success: boolean;
    courses?: any[];
    message?: string;
  };
}

// Fetch All Courses
export function getAllCourses() {
    
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading("Fetching courses...");
    dispatch(setLoading(true));

    try {
      const response: GetCoursesResponse = await apiConnector({
        method: "GET",
        url: courseEndpoints.GET_ALL_COURSES_API,
      });

      console.log("GET COURSES API RESPONSE:", response);

      if (!response.data.success || !response.data.courses) {
        throw new Error(response.data.message || "Failed to fetch courses");
      }

      dispatch(setCourses(response.data.courses)); // ✅ Update Redux State
      toast.success("Courses loaded successfully");
    } catch (error: any) {
      console.error("GET COURSES API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to load courses");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// // Fetch a course by ID
// export interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
  
//   // Add other properties as needed
// }

export const getCourseById = async (courseId: string): Promise<ICourse | null> => {
    const toastId = toast.loading("Loading course details...");

    try {
        // API call to fetch course details
        const response = await apiConnector({
            method: "GET",
            url: `${courseEndpoints.GET_COURSE_BY_ID}/${courseId}`, // Ensure this matches your backend route
        });

        console.log("GET COURSE API response:", response);

        if (!response.data.success) {
            throw new Error(response.data.message || "Failed to fetch course details");
        }

        // Extract course details from response
        const course = response.data.course;
        toast.success("Course details fetched successfully");

        return course; // Return course data
    } catch (error: any) {
        console.error("GET COURSE API ERROR", error);
        toast.error(error.response?.data?.message || "Failed to fetch course details");
        return null; // Return null in case of an error
    } finally {
        toast.dismiss(toastId);
    }
};

