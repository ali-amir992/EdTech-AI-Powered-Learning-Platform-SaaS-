export * from "./Category";
export * from "./Course";
export * from "./Lesson";
export * from "./Section";
export * from "./User";

// Additional interfaces for the course builder
export interface CourseFormData {
    title: string
    description: string
    price: number
    category: string
    language: string
    thumbnail: File | null
    status: "Draft" | "Published"
  }
  
  export interface SectionFormData {
    _id?: string
    title: string
    description: string
    order: number
    lessons: LessonFormData[]
  }
  
  export interface LessonFormData {
    _id?: string
    title: string
    description?: string
    videoFile: File | null
    videoUrl?: string
    duration?: string
    order: number
  }