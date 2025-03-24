import express from "express";
import { createLesson } from "@controllers/Lesson";
import { isAuthenticated, isInstructor } from "@middlewares/Auth"; 
import { handlePayment } from "@controllers/Payment";

const router = express.Router();

router.post('/create-checkout-session', isAuthenticated , handlePayment)
export default router;
