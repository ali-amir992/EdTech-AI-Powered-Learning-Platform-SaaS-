import { Request, Response } from "express";
import Category from "@models/Category";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
      
        // Validate required fields
        if (!name) {
            res.status(400).json({ success: false, message: "Name is required." });
            return;
        }

        // Check if the category exists
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            res.status(400).json({ success: false, message: "Category already exists." });
            return;
        }

        // Save category details in database
        const newCategory = new Category({
            name,
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category created successfully.",
            category: newCategory,
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
}