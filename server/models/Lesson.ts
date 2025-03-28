import mongoose, { Schema, Document } from "mongoose";

export interface ILesson extends Document {
    title: string;
    description: string;
    videoUrl: string;
    duration: string; // Duration in seconds
    section: mongoose.Types.ObjectId; // Reference to Section
    order: string;
    createdAt: Date;
    updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
    {
        title: {
            type: String,
            required: true
        },
        description: { type: String },
        videoUrl: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        section: {
            type: Schema.Types.ObjectId,
            ref: "Section",
            required: true
        },
        order: {
            type: String,
            required: true
        }, // Position of the lesson within a section
    },
    { timestamps: true }
);

export default mongoose.model<ILesson>("Lesson", LessonSchema);
