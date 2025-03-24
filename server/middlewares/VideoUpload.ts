import multer from "multer";
import path from "path";
import fs from "fs";

// Define upload directories
const videoUploadPath = path.join(__dirname, "../uploads/videos");
const imageUploadPath = path.join(__dirname, "../uploads/images");

// Ensure directories exist
[videoUploadPath, imageUploadPath].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine storage folder based on file type
        const isImage = file.mimetype.startsWith("image/");
        cb(null, isImage ? imageUploadPath : videoUploadPath);
    },
    filename: (req, file, cb) => {
        // Preserve file extension and sanitize filename
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, "_");
        cb(null, `${Date.now()}-${name}${ext}`);
    },
});

// File Filter to Allow Only Images & Videos
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const videoTypes = ["video/mp4", "video/mkv", "video/avi", "video/webm"];

    // For course thumbnail uploads
    if (file.fieldname === "thumbnail") {
        if (!imageTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Please upload an image (PNG, JPEG, JPG, or WebP)."));
        }
        return cb(null, true);
    }

    // For video uploads
    if (file.fieldname === "video") {
        if (!videoTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Please upload a video (MP4, MKV, AVI, or WebM)."));
        }
        return cb(null, true);
    }

    cb(null, true);
};


// Define Upload Middleware (Handles Both Images & Videos)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 200 * 1024 * 1024, files: 1 }, // Max 200MB
});

export default upload;
