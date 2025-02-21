import mongoose, { Schema, Document, Model } from "mongoose";

//interface for the User document

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  role: "Student" | "Instructor" | "Admin";
  courses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Instructor", "Admin"],
      required: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

// Define the model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;

// dateOfBirth: {
//   type: Date,
//   required: true
// },