import { Router } from "express";
import { login, signup, sendOTP } from "@controllers/authController";
import { isAuthenticated, isStudent, isAdmin, isInstructor } from "@middlewares/authMiddleware";
import { updateAvatar } from "@controllers/profileController";
const router = Router();


router.post("/sendOTP", sendOTP)
router.post("/signup", signup);
router.post("/login", login);


router.get("/dashboard", isAuthenticated, (req, res) => {
    res.json({ message: "Welcome to your dashboard!" });
});


router.get("/student-dashboard", isAuthenticated, isStudent, (req, res) => {
    res.json({ message: "Welcome Student!" });
});


router.get("/instructor-dashboard", isAuthenticated, isInstructor, (req, res) => {
    res.json({ message: "Welcome Instructor!" });
});



router.get("/admin-dashboard", isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

router.put("/updateAvatar" , isAuthenticated , updateAvatar);


export default router;