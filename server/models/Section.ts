import mongoose, { Schema, Document } from "mongoose";
import { ILesson } from "./Lesson";

export interface ISection extends Document {
    course: mongoose.Types.ObjectId;
    title: string;
    lessons: mongoose.Types.ObjectId[];
    order: number; 
    createdAt: Date;
    updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course", required: true
        },
        title: {
            type: String,
            required: true
        },
        lessons: [{
            type: Schema.Types.ObjectId,
            ref: "Lesson"
        }], // Lessons in this section
        order: {
            type: Number,
            required: true
        }, // Order of sections
    },
    { timestamps: true }
);

export default mongoose.model<ISection>("Section", SectionSchema);
