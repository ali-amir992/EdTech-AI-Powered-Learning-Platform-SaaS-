import express from "express";
import { createSection, getSectionsByCourse, updateSection, deleteSection } from "@controllers/Section";
import { isAuthenticated, isAdmin, isInstructor } from "@middlewares/Auth";

const router = express.Router();

// Routes
router.post("/create", isAuthenticated, isInstructor, createSection);
router.get("/:courseId", getSectionsByCourse);
router.put("/update/:sectionId", isAuthenticated, isInstructor, updateSection);
router.delete("/delete/:sectionId", isAuthenticated, isInstructor, deleteSection);

export default router;
