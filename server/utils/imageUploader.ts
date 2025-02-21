import { v2 as cloudinary, UploadApiResponse, UploadApiOptions } from "cloudinary";

export const uploadImageToCloudinary = async (
    filePath: string, 
    folder: string, 
    height?: number, 
    quality?: number
): Promise<UploadApiResponse> => {
    const options: UploadApiOptions = { folder, resource_type: "auto" };

    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(filePath, options);
};
