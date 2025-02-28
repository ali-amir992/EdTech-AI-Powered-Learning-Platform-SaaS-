import mongoose, { Schema, Document, Model } from "mongoose";

//interface for the User document

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  role: "Student" | "Instructor" | "Admin";
  courses: mongoose.Types.ObjectId[];
  image: string,
  phone: string,
  gender: string,
  about: string,
  status: "Blocked" | "Deleted" | "Verified" | "Not-Verified" | "Pending",
  createdAt: Date;
  updatedAt: Date;
  token: string;
  resetPasswordExpires: number;

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
    image: {
      type: String
    },

    gender: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Blocked", "Deleted", "Verified", "Not-Verified", "Pending"],
      default: "Not-Verified",
    },
    dateOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
      trim: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    token: {
      type: String, // Stores the reset token
    },
    resetPasswordExpires: {
      type: Number, // Stores expiration timestamp
    }
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