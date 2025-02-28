import { Request, Response } from "express";
import Course from "@models/Course";
import User from "@models/User";


export const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, price, instructor, category } = req.body;

        // Check if instructor exists

        const instructorExists = await User.findById(instructor);
        if (!instructorExists) {
            res.status(404).json({ success: false, message: "Instructor not found" });
            return;
        }

        const newCourse = new Course({
            title,
            description,
            price,
            instructor,
            category,
            status: "Draft", //a course is always created in draft mode
        });

        await newCourse.save();

        res.status(201).json({ success: true, message: "Course created in draft mode", course: newCourse });
    } catch (error) {
        console.log("Error creating course", error);
        res.status(500).json({ success: false, message: "Failed to create course" });
    }
};

// ✅ 2. Publish Course (Only instructor can publish)
export const publishCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }

        if (course.lessons.length === 0) {
            res.status(400).json({ success: false, message: "Course must have at least one lesson before publishing" });
            return;
        }

        course.status = "Published";
        await course.save();

        res.json({ success: true, message: "Course published successfully", course });
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
        const courses = await Course.find().populate("instructor category lessons");
        res.status(200).json({ success: true, courses });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve courses", error });
        return;

    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("instructor category lessons");

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

