// import { uploadImageToCloudinary } from "@utils/imageUploader";
// import { Request, Response } from "express";

//need to handle typeErrors
// export const updateDisplayPicture = async (req : Request, res:Response) => {
//     try {
//       const displayPicture = req.files.displayPicture
//       const userId = req.user.id
//       const image = await uploadImageToCloudinary(
//         displayPicture,
//         process.env.FOLDER_NAME,
//         1000,
//         1000
//       )
//       console.log(image)
//       const updatedProfile = await User.findByIdAndUpdate(
//         { _id: userId },
//         { image: image.secure_url },
//         { new: true }
//       )
//       res.status(200).json({
//         success: true,
//         message: `Image Updated successfully`,
//         data: updatedProfile,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
//   };