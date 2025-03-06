export interface ISection {
    _id: string;
    course: string; // Course ID
    title: string;
    lessons: string[]; // Array of Lesson IDs
    order: number; // Position of section in course
    createdAt: string;
    updatedAt: string;
}
