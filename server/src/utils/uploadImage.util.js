import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        return result;
    } catch (error) {
        throw new Error("Failed to Uplaod Image From Cloudinary Upload Function");
    }
};