import { ICourse } from "./Course";

export interface ICategory {
    _id: string;
    name: string;
    description?: string;
    courses: ICourse[]; // Array of Course IDs
    createdAt: string;
    updatedAt: string;
}
