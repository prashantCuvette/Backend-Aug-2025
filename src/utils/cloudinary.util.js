import cloudinary from "../configs/cloudinary.config.js";

export const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        return result;
    } catch (error) {
        console.log(error);
    }
};