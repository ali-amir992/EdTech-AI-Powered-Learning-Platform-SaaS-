import { ICourse } from "./Course";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: "Student" | "Instructor" | "Admin";
    courses: ICourse[]; // Array of Course IDs
    image?: string;
    phone?: string;
    gender?: string;
    about?: string;
    // status: "Blocked" | "Deleted" | "Verified" | "Not-Verified" | "Pending";
    dateOfBirth?: string;
    // token?: string;
    resetPasswordExpires?: number;
    createdAt: string;
    updatedAt: string;
}