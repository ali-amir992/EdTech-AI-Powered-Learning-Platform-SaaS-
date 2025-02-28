import User from "@models/User";
import mailSender from "@utils/mailSender";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import crypto from "crypto";

// Reset Password Token
export const resetPasswordToken = async (req : Request, res : Response) => {
    try {
        const { email } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered with us."
            });
        }

        // Generate token
        const token = crypto.randomBytes(20).toString("hex");
        
        // Update user with token and expiration time
        user.token = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Create reset URL
        const url = `${process.env.FRONTEND_URL}/update-password/${token}`;

        // Send email with reset link
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

        return res.json({
            success: true,
            message: "Email sent successfully. Please check your inbox to reset your password."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending the reset password email."
        });
    }
};

// Reset Password
export const resetPassword = async (req :Request , res : Response) => {
    try {
        const { password, confirmPassword, token } = req.body;

        // Validate passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match."
            });
        }

        // Find user by token
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token."
            });
        }

        // Check if token is expired
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token has expired. Please request a new one."
            });
        }

        // Hash new password
        user.password = await bcrypt.hash(password, 10);
        user.token = "null";
        user.resetPasswordExpires = 0;
        await user.save();

        return res.json({
            success: true,
            message: "Password reset successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password."
        });
    }
};
