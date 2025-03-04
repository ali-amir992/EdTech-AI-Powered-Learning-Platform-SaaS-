import { toast } from "react-hot-toast";
import { setLoading } from "@/store/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import { Dispatch } from "@reduxjs/toolkit";
import { setCourses } from "@/store/slices/courseSlice";

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
