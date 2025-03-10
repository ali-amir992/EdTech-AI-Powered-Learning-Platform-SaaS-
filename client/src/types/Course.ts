import { ICategory } from "./Category";
import { ISection } from "./Section";
import { IUser } from "./User";

export interface ICourse {
    _id: string;
    title: string;
    description: string;
    price: number;
    instructor: IUser; // User ID
    studentsEnrolled: IUser[]; // Array of User IDs
    sections: ISection[]; // Array of Section IDs
    category: ICategory; // Category ID
    language: string;
    thumbnail: string; // URL of the course thumbnail
    status: "Draft" | "Published";
    createdAt: string;
    updatedAt: string;
}
