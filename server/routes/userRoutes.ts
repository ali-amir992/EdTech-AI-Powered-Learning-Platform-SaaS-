import { Router, Response, RequestHandler } from "express";
import { login, signup, sendOTP } from "@controllers/authController";
import { isAuthenticated, isStudent, isAdmin, isInstructor, AuthRequest } from "@middlewares/authMiddleware";
import { updateAvatar } from "@controllers/profileController";
import jwt from "jsonwebtoken";
import passport from "passport";
require('dotenv').config();
const router = Router();

router.post("/sendOTP", sendOTP)
router.post("/signup", signup);
router.post("/login", login);

// Add these routes to your existing router
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    ((req: AuthRequest, res: Response) => {
      const token = jwt.sign(
        { id: req.user?.id, email: req.user?.email, role: req.user?.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
      );
  
      res.cookie("token", token).redirect("http://localhost:5173/profile");
    }) as RequestHandler
  );

router.get("/dashboard", isAuthenticated, ((req: AuthRequest, res: Response) => {
    res.json({ message: "Welcome to your dashboard!" });
}) as RequestHandler);


router.get("/student-dashboard", isAuthenticated, isStudent, ((req: AuthRequest, res: Response) => {
    res.json({ message: "Welcome Student!" });
}) as RequestHandler);


router.get("/instructor-dashboard", isAuthenticated, isInstructor, ((req: AuthRequest, res: Response) => {
    res.json({ message: "Welcome Instructor!" });
}) as RequestHandler);



router.get("/admin-dashboard", isAuthenticated, isAdmin, ((req: AuthRequest, res: Response) => {
    res.json({ message: "Welcome Admin!" });
}) as RequestHandler);

router.put("/updateAvatar", isAuthenticated, updateAvatar);


export default router;