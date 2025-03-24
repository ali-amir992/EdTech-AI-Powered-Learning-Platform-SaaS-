import express from "express";
import upload from "@middlewares/VideoUpload";
import { createLesson } from "@controllers/Lesson";
import { isAuthenticated, isInstructor } from "@middlewares/Auth"; // Ensure only instructors can upload

const router = express.Router();

// Route to create a new lesson (Instructor only)
router.post("/create", isAuthenticated, isInstructor, upload.single("video"), createLesson);

export default router;
