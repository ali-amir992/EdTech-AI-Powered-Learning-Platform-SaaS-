import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
}

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload; // Load initial courses
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload); // Add new course to UI
    },
  },
});

export const { setCourses, addCourse } = courseSlice.actions;
export default courseSlice.reducer;
