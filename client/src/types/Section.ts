import { ICourse } from "./Course";
import { ILesson } from "./Lesson";

export interface ISection {
    _id: string;
    course: ICourse;
    title: string;
    description: string;
    lessons: ILesson[]; // Array of Lesson IDs
    order: number; // Position of section in course
    createdAt: string;
    updatedAt: string;
}
