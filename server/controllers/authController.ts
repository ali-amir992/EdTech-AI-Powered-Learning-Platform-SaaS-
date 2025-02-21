import { Request, Response } from "express";
import User from "@models/userModel";
import OTPModel from "@models/otpModel";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

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
            const missingFields = [];
            if (!name) missingFields.push("name");
            if (!email) missingFields.push("email");
            if (!password) missingFields.push("password");
            if (!confirmPassword) missingFields.push("confirmPassword");
            if (!role) missingFields.push("role");
            if (!otp) missingFields.push("otp");
        
            console.log("Missing fields:", missingFields.join(", "));
            res.status(400).json({ message: "Please fill all fields", missingFields });
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
