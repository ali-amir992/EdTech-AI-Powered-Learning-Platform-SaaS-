import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

// Middleware to verify JWT and check if the user is logged in
export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthRequest["user"];
        req.user = decoded;

        next();
    } catch (error) {
         res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
         return;

    }
};

// Middleware to check if the user is a Student
export const isStudent = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "Student") {
        res.status(403).json({ success: false, message: "Forbidden: Access restricted to students only" });
        return;

    }
    next();
};

// Middleware to check if the user is an Instructor
export const isInstructor = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "Instructor") {
        res.status(403).json({ success: false, message: "Forbidden: Access restricted to instructors only" });
        return;

    }
    next();
};

// Middleware to check if the user is an Admin
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "Admin") {
        res.status(403).json({ success: false, message: "Forbidden: Access restricted to admins only" });
        return;
    }
    next();
};
