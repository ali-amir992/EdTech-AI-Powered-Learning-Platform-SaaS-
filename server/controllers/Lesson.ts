import { Request, Response } from "express";
import Lesson from "@models/Lesson";
import mongoose from "mongoose";
import Section from "@models/Section";
import fs from "fs";

export const createLesson = async (req: Request, res: Response) => {
    try {
        
        const { title, description, duration, section, order } = req.body;

        // Debug log
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        // Validate required fields
        if (!title || !duration || !section || !order) {

            res.status(400).json({
                success: false,
                message: "Title, duration, section, and order are required."
            });
            return;
        }

        // Ensure video file is uploaded
        if (!req.file) {
            res.status(400).json({ success: false, message: "Video file is required." });
            return;
        }

        // Validate file type
        const allowedMimeTypes = ["video/mp4", "video/mkv", "video/avi", "video/webm"];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            // Remove the uploaded file if it's not valid
            fs.unlinkSync(req.file.path);
             res.status(400).json({
                success: false,
                message: "Invalid file type. Only MP4, MKV, AVI, and WEBM videos are allowed."
            });
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
        sectionExists.lessons.push(newLesson._id as mongoose.Types.ObjectId); 
        await sectionExists.save();

        res.status(201).json({
            success: true,
            message: "Lesson created successfully.",
            lesson: newLesson,
        });
    } catch (error) {

            // If there's an error and a file was uploaded, remove it
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error("Error creating lesson:", error);
             res.status(500).json({ 
                success: false, 
                message: "Internal server error.",
                error: error instanceof Error ? error.message : 'Unknown error'
            });
    }
};
