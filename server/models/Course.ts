import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
    title: string;
    description: string;
    price: number;
    instructor: mongoose.Types.ObjectId;
    lessons: mongoose.Types.ObjectId[];
    studentsEnrolled: mongoose.Types.ObjectId[];
    sections: mongoose.Types.ObjectId[]; 
    category: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    language: string;
    thumbnail: string;
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
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        language: {
            type: String,
        },
        status : {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft"
        },
        thumbnail: { type: String,
            
            required: true }, 
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
