import { ISection } from "./Section";

export interface ILesson {
    _id: string;
    title: string;
    description?: string;
    videoUrl: string; // URL of the video
    duration: string; // Duration in seconds
    section: ISection; // Section ID
    order: string; // Lesson order within section
    createdAt: string;
    updatedAt: string;
    
}
