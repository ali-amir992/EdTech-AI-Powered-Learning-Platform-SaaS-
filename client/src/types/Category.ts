export interface ICategory {
    _id: string;
    name: string;
    description?: string;
    courses: string[]; // Array of Course IDs
    createdAt: string;
    updatedAt: string;
}
