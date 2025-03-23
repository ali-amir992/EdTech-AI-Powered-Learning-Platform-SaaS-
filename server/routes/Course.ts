import express, { RequestHandler } from "express";
import {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    publishCourse,
    getEnrolledCourses
    
} from "@controllers/Course";
import { isAuthenticated, isAdmin, isInstructor, isStudent } from "@middlewares/Auth";
import upload from "@middlewares/VideoUpload";

const router = express.Router();

// ✅ Public Routes (Anyone can access)
router.get("/", getAllCourses as RequestHandler);        // Get all courses
router.get("/:courseId", getCourseById as RequestHandler); // Get course details by ID

// ✅ Protected Routes (Requires authentication)
router.post("/", isAuthenticated, isInstructor, upload.single("thumbnail"), createCourse as RequestHandler); // Create a course
router.put("/:courseId", isAuthenticated, isInstructor, updateCourse as RequestHandler); // Update course
router.delete("/:courseId", isAuthenticated, isAdmin, deleteCourse as RequestHandler); // Delete course
router.post("/enrolledCourses", isAuthenticated, getEnrolledCourses as RequestHandler); // Get enrolled courses
// // ✅ Lesson Management (Instructor Only)
// router.post("/:courseId/lessons", verifyToken, isInstructor, addLessonToCourse); // Add lesson to course

// // ✅ Course Publishing (Instructor/Admin Only)
router.put("/:courseId/publish", isAuthenticated, isInstructor, publishCourse as RequestHandler); // Publish a course

// // ✅ Enrollment (Student Only)
// router.post("/:courseId/enroll", verifyToken, isStudent, enrollInCourse); // Enroll in a course

export default router;
