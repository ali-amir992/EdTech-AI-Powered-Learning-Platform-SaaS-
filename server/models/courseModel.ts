import mongoose, { Schema, Document, Model } from "mongoose";

interface ICourse extends Document {
    courseName: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    students: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
const CourseSchema: Schema<ICourse> = new Schema({
    courseName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

const CourseModel: Model<ICourse> = mongoose.model<ICourse>("Course", CourseSchema);
export default CourseModel;