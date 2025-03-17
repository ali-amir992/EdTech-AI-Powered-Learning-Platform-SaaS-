import { Request, Response } from "express";
import Course from "@models/Course";
import { cloudinaryConnect, cloudinary } from "@config/cloudinary";
import User from "@models/User";
import fs from "fs";
import axios from "axios";


export const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, price, instructor, category } = req.body;

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail is required"
            });

        }

        const instructorExists = await User.findById(instructor);
        if (!instructorExists) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            });
        }

        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "course-thumbnails",
            resource_type: "image"
        });

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        const newCourse = new Course({
            title,
            description,
            price,
            instructor,
            category,
            thumbnail: result.secure_url,
            status: "Draft"
        });

        await newCourse.save();

        res.status(201).json({
            success: true,
            message: "Course created in draft mode",
            course: newCourse
        });
        return;
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course"
        });
    }
};

// ✅ 2. Publish Course (Only instructor can publish)
export const publishCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId)
            .populate({
                path: "sections",
                populate: {
                    path: "lessons",
                    model: "Lesson", // Ensure lessons are properly populated
                },
            })
            .populate("instructor"); // Populate instructor for 'about' field

        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }

        if (course.sections.length === 0) {
            res.status(400).json({ success: false, message: "Course must have at least one section before publishing" });
            return;
        }

        course.status = "Published";
        await course.save();

        // Send course data to FastAPI
        const courseData = {
            course: {
                title: course.title,
                description: course.description,
                language: course.language,
                category: course.category.toString(), // Convert ObjectId to string
            },
            sections: course.sections.map((section: any) => ({
                title: section.title,
                lessons: section.lessons.map((lesson: any) => ({
                    title: lesson.title,
                    description: lesson.description,
                    transcript: lesson.transcript || "",
                })),
            })),
            instructor: {
                about: course.instructor.toString() || "",
            },
        };

        // Send course data to FastAPI
        await axios.post("http://localhost:8000/store-course", courseData);

        res.json({ message: "Course published and embeddings stored!" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to publish course" });
    }
};

export const getPublishedCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find({ status: "published" }).populate("instructor category");
        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
};


export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { title, description, price, contentType, category } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { title, description, price, contentType, category },
            { new: true }
        );

        if (!updatedCourse) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }

        res.status(200).json({ success: true, course: updatedCourse });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update course", error });
        return;
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;

        }

        res.status(200).json({ success: true, message: "Course deleted successfully" });
        return;

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete course", error });
        return;
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find().populate("instructor category");
        res.status(200).json({ success: true, courses });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Failed to retrieve courses", error });
        return;

    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId)
            .populate("instructor")
            .populate("category")
            .populate({
                path: "sections",
                populate: {
                    path: "lessons", // Populate lessons inside each section
                },
            });


        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }

        res.status(200).json({ success: true, course });
        return;

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve course", error });
        return;
    }
};

