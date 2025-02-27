import { Request, Response } from "express";
import User from "@models/userModel";
import OTPModel from "@models/otpModel";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import { AuthRequest } from "@middlewares/authMiddleware";
import mailSender from '@utils/mailSender'
import updatePassword from '@utils/updatePassword';

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        const otpPayload = { email, otp };
        const otpBody = await OTPModel.create(otpPayload)


        res.status(200).json({
            success: true,
            otp,
            message: "OTP stored in Database successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "otp generation failed",
        })
    }
}
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, confirmPassword, role, otp } = req.body;

        if (!name || !email || !password || !confirmPassword || !role || !otp) {
      
            res.status(400).json({ message: "Please fill all fields" });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        //find the most recent otp for the user
        const recentOtp = await OTPModel.find({ email }).sort({ createdAt: -1 }).limit(1)
        console.log("recent otp", recentOtp)

        if (recentOtp.length == 0 || recentOtp[0].otp !== otp) {
            res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            image:`https://api.dicebear.com/6.x/initials/svg?seed=${name}`, //to create a photo using initials like SKYPE
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({
            success: false,
            message: "User sign-up failed",
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Please fill all fields" });
            return;

        }

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "24h" });

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            console.log("cookie is now stored in the browser");
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully",
            });

        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({
            success: false,
            message: "User login failed",
        });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        // Ensure user is authenticated
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user ID found",
            });
        }
        const id = req.user.id;

        // Fetch data from the body
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Validate new and confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // Fetch user from database
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Validate old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect old password",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in DB
        user.password = hashedPassword;
        await user.save();

        // Send notification email (but do not fail if it fails)
        try {
            await mailSender(
                user.email,
                "Password updated - Study Notion",
                updatePassword(
                    user.email,
                    `Password updated successfully for ${user.name}`,
                )
            );
        } catch (error) {
            console.error("Error sending email:", error);
        }

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to change the password, please try again",
        });
    }
};

