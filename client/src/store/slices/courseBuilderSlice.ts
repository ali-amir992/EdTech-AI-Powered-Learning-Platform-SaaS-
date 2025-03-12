import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse, ISection, ILesson } from "@/types";


// export interface ICourse {
//     _id?: string;
//     title: string;
//     description: string;
//     price: number;
//     instructor: IUser;
//     studentsEnrolled: IUser[]; // 
//     sections: ISection[]; 
//     category: ICategory; 
//     language: string;
//     thumbnail: File; // URL of the course thumbnail
//     status: "Draft" | "Published";
//     createdAt: string;
//     updatedAt: string;
// }


interface CourseBuilderState {
  step: number;
  courseDetails: ICourse;
  isPublished: boolean;
}

const initialState: CourseBuilderState = {
  step: 1,
  courseDetails: {
    sections: [], // Initial empty array of sections
  },
  isPublished: false,
};

const courseBuilderSlice = createSlice({
  name: "courseBuilder",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },

    setCourse: (state, action : PayloadAction<Partial<ICourse>>) => {
      state.courseDetails = action.payload
    },
    updateCourseDetails: (state, action: PayloadAction<Partial<ICourse>>) => {
      state.courseDetails = { ...state.courseDetails, ...action.payload };
    },
    addSection: (state, action: PayloadAction<ISection>) => {
      state.courseDetails.sections?.push(action.payload);
    },
    updateSection: (state, action: PayloadAction<ISection>) => {
      if (state.courseDetails.sections) {
        state.courseDetails.sections = state.courseDetails.sections.map((section) =>
          section._id === action.payload._id ? action.payload : section
        );
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      if (state.courseDetails.sections) {
        state.courseDetails.sections = state.courseDetails.sections.filter((s) => s._id !== action.payload);
      }
    },
    addLesson: (state, action: PayloadAction<{ sectionId: string; lesson: ILesson }>) => {
      const section = state.courseDetails.sections?.find((s) => s._id === action.payload.sectionId);
      if (section) {
        section.lessons.push(action.payload.lesson);
      }
    },
    publishCourse: (state) => {
      state.isPublished = true;
    },
    resetCourseBuilder: () => initialState,
  },
});

export const {
  setStep,
  setCourse,
  updateCourseDetails,
  addSection,
  updateSection,
  removeSection,
  addLesson,
  publishCourse,
  resetCourseBuilder,
} = courseBuilderSlice.actions;

export default courseBuilderSlice.reducer;
