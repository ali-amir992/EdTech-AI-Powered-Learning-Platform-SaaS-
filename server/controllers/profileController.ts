import { Request, Response } from "express";
import { uploadImageToCloudinary } from "@utils/imageUploader";
import User from "@models/userModel"; // Adjust path as needed
import fileUpload from "express-fileupload"; // Import fileUpload types
require('dotenv').config();

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.displayPicture) {
       res.status(400).json({
        success: false,
        message: "No image file uploaded.",
      });
      return;
    }

    // Type assertion for express-fileupload's UploadedFile
    const displayPicture = req.files.displayPicture as fileUpload.UploadedFile;
    const userId = (req as any).user.id; // Adjust based on auth middleware

    const image = await uploadImageToCloudinary(
      displayPicture.tempFilePath,
      process.env.FOLDER_NAME || "default-folder",
      1000,
      1000
    );

    if (!image || !image.secure_url) {
       res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    if (!updatedProfile) {
       res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || "Internal Server Error",
    });
    return;
  }
};
