import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload; // Load initial courses
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
  },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload); // Add new course to UI
    },
  },
});

export const { setCourses,setLoading, addCourse } = courseSlice.actions;
export default courseSlice.reducer;
