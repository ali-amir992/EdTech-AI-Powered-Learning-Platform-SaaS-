import { ILesson } from "./Lesson";

export interface ISection {
    _id: string;
    course: string; // Course ID
    title: string;
    lessons: ILesson[]; // Array of Lesson IDs
    order: number; // Position of section in course
    createdAt: string;
    updatedAt: string;
}
