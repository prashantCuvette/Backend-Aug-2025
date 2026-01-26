import cloudinary from "../configs/cloudinary.config.js";

export const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            invalidate: true
        });
        return result;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
}