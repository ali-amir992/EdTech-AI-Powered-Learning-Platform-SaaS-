import { ICategory } from "./Category";
import { ISection } from "./Section";
import { IUser } from "./User";

export interface ICourse {
    _id?: string;
    title: string;
    description: string;
    price: number;
    instructor: IUser;
    studentsEnrolled: IUser[]; // 
    sections: ISection[]; 
    category: ICategory; 
    language: string;
    thumbnail: File; // URL of the course thumbnail
    status: "Draft" | "Published";
    createdAt: string;
    updatedAt: string;
}
