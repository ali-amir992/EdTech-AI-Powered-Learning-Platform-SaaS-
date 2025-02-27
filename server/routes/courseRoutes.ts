import express from "express";
import {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    publishCourse,
    
} from "../controllers/courseController";
import { verifyToken, isAdmin, isInstructor, isStudent } from "../middlewares/authMiddleware";

const router = express.Router();

// ✅ Public Routes (Anyone can access)
router.get("/", getAllCourses);        // Get all courses
router.get("/:courseId", getCourseById); // Get course details by ID

// ✅ Protected Routes (Requires authentication)
router.post("/", verifyToken, isInstructor, createCourse); // Create a course
router.put("/:courseId", verifyToken, isInstructor, updateCourse); // Update course
router.delete("/:courseId", verifyToken, isAdmin, deleteCourse); // Delete course

// // ✅ Lesson Management (Instructor Only)
// router.post("/:courseId/lessons", verifyToken, isInstructor, addLessonToCourse); // Add lesson to course

// // ✅ Course Publishing (Instructor/Admin Only)
router.put("/:courseId/publish", verifyToken, isInstructor, publishCourse); // Publish a course

// // ✅ Enrollment (Student Only)
// router.post("/:courseId/enroll", verifyToken, isStudent, enrollInCourse); // Enroll in a course

export default router;
