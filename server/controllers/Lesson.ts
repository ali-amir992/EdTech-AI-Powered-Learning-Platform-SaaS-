import { Request, Response } from "express";
import Lesson from "@models/Lesson";
import mongoose from "mongoose";
import Section from "@models/Section";

export const createLesson = async (req: Request, res: Response) => {
    try {
        const { title, description, duration, section, order } = req.body;

        // Validate required fields
        if (!title || !duration || !section || !order) {
            res.status(400).json({ success: false, message: "Title, duration, section, and order are required." });
            return;
        }

        // Ensure video file is uploaded
        if (!req.file) {
            res.status(400).json({ success: false, message: "Video file is required." });
            return;
        }

        // Check if the section exists
        const sectionExists = await Section.findById(section);
        if (!sectionExists) {
            res.status(404).json({ success: false, message: "Section not found." });
            return;

        }

        const videoUrl = `/uploads/videos/${req.file.filename}`;
        // Save lesson details in database
        const newLesson = new Lesson({
            title,
            description,
            videoUrl,
            duration,
            section,
            order,
        });

        await newLesson.save();

        // Update section to include this lesson  
        sectionExists.lessons.push(newLesson._id as mongoose.Types.ObjectId); // 👈 Fixing the TypeScript Error
        await sectionExists.save();

        res.status(201).json({
            success: true,
            message: "Lesson created successfully.",
            lesson: newLesson,
        });
    } catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
};
