import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadPath = path.join(__dirname, "../uploads/videos");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to allow only video files
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimeTypes = ["video/mp4", "video/mkv", "video/avi", "video/webm"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only videos are allowed."), false);
    }
};

// Define upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 200 * 1024 * 1024 }, // Max 200MB per video
});

export default upload;
