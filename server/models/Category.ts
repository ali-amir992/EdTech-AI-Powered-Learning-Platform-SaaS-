import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description?: string;
    courses: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },

        courses: [{
            type: Schema.Types.ObjectId,
            ref: "Course"
        }], // Courses under this category
    },
    { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
