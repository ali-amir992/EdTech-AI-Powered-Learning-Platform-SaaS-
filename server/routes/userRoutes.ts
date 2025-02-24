import { Router, Response , NextFunction } from "express";
import { login, signup, sendOTP } from "@controllers/authController";
import { isAuthenticated, isStudent, isAdmin, isInstructor, AuthRequest } from "@middlewares/authMiddleware";
import { updateAvatar } from "@controllers/profileController";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = Router();


// Redirect user to Google login page
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
// Google callback route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req: AuthRequest, res: Response) => {
        try {
            const user = req.user!;

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );

            // Redirect or send token to frontend
            res.redirect(`http://localhost:3000?token=${token}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);
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

router.put("/updateAvatar", isAuthenticated, updateAvatar);


export default router;