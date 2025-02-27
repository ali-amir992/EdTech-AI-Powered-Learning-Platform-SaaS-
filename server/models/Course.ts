import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
    title: string;
    description: string;
    price: number;
    instructor: mongoose.Types.ObjectId;
    contentType: "video" | "document" | "quiz";
    lessons: mongoose.Types.ObjectId[];
    studentsEnrolled: mongoose.Types.ObjectId[];
    sections: mongoose.Types.ObjectId[]; 
    category: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    language: string;
    status: "Draft" | "Published";
}

const CourseSchema = new Schema<ICourse>(
    {
        title:
        {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: "User", required: true
        },

        contentType: {
            type: String,
            enum: ["video", "document", "quiz"],
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", required: true
        },
        language: {
            type: String,
        },
        status : {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft"
        },
        lessons: [{
            type: Schema.Types.ObjectId,
            ref: "Lesson"
        }],
        studentsEnrolled: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        sections: [{
            type: Schema.Types.ObjectId,
            ref: "Section"
        }],
    },
    { timestamps: true }
);

export default mongoose.model<ICourse>("Course", CourseSchema);
