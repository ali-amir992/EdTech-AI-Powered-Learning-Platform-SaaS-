import { Request, Response } from "express";
import Section from "@models/Section";
import Course from "@models/Course";
import mongoose from "mongoose";

// Create Section Controller
export const createSection = async (req: Request, res: Response) => {
    try {
        const { title, course, order } = req.body;

        // Validate input
        if (!title || !course || order === undefined) {
            res.status(400).json({ success: false, message: "Title, course ID, and order are required." });
            return;

        }

        // Check if course exists
        const courseExists = await Course.findById(course);
        if (!courseExists) {
            res.status(404).json({ success: false, message: "Course not found." });
            return;

        }

        // Create a new section
        const newSection = new Section({
            title,
            course: new mongoose.Types.ObjectId(course),
            lessons: [],
            order,
        });

        // Save the section to the database
        await newSection.save();

        // Add section ID to the course
        courseExists.sections.push(newSection._id as mongoose.Types.ObjectId);
        await courseExists.save();

        res.status(201).json({
            success: true,
            message: "Section created successfully.",
            section: newSection,
        });

    } catch (error) {
        console.error("Error creating section:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getSectionsByCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        // Validate course ID
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            res.status(400).json({ success: false, message: "Invalid course ID." });
            return;
        }

        // Find sections by course ID
        const sections = await Section.find({ course: courseId }).sort({ order: 1 }).populate("lessons");

        if (!sections.length) {
            res.status(404).json({ success: false, message: "No sections found for this course." });
            return;

        }

        res.status(200).json({
            success: true,
            sections,
        });

    } catch (error) {
        console.error("Error fetching sections:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
};


export const updateSection = async (req: Request, res: Response) => {
    try {
        const { sectionId } = req.params;
        const { title, order } = req.body;

        // Validate input
        if (!title && order === undefined) {
            res.status(400).json({ success: false, message: "At least one field (title or order) is required." });
            return;

        }

        // Check if section exists
        const section = await Section.findById(sectionId);
        if (!section) {
            res.status(404).json({ success: false, message: "Section not found." });
            return;
        }

        // Update fields
        if (title) section.title = title;
        if (order !== undefined) section.order = order;

        await section.save();

        res.status(200).json({
            success: true,
            message: "Section updated successfully.",
            section,
        });

    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteSection = async (req: Request, res: Response) => {
    try {
        const { sectionId } = req.params;

        // Validate section ID
        if (!mongoose.Types.ObjectId.isValid(sectionId)) {
            res.status(400).json({ success: false, message: "Invalid section ID." });
            return;
        }

        // Find and delete section
        const section = await Section.findByIdAndDelete(sectionId);
        if (!section) {
            res.status(404).json({ success: false, message: "Section not found." });
            return;
        }

        // Remove section from course
        await Course.findByIdAndUpdate(section.course, {
            $pull: { sections: sectionId }
        });

        res.status(200).json({
            success: true,
            message: "Section deleted successfully.",
        });

    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
