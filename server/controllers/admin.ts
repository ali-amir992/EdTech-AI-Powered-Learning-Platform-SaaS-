import { Request, Response } from "express";
import { AuthRequest } from "@middlewares/authMiddleware";
import User from "@models/userModel";
import bcrypt from "bcryptjs";


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists." });
      return;
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student", // Default role
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // Prepare update data
    let updateData: any = { name, email, role };

    // If password is being updated, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({ success: true, message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}
