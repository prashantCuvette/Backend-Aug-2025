import fs from "node:fs";
import { uploadImage } from "../utils/cloudinary.util.js"

export const createMemory = async (req, res) => {
    try {

        // console.log(req.body);
        // console.log(req.file); // fieldname, originalname, encoding, mimetype, buffer, size = 5382 byte, sent as kibibyte

        fs.writeFileSync(`uploads/${req.file.originalname}`, req.file.buffer);
        const filePath =
            `${process.cwd()}/uploads/${req.file.originalname}`;

        const result = await uploadImage(filePath);
        console.log(result);

        fs.unlinkSync(filePath); // delete the file





        res.send("HI");

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            reason: "internal server error",
            message: error.message,
        });
    }
};

export const getMemory = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            reason: "internal server error",
            message: error.message,
        })
    }
};

export const updateMemory = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            reason: "internal server error",
            message: error.message,
        })
    }
};

export const deleteMemory = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            reason: "internal server error",
            message: error.message,
        })
    }
};

// Extra Features
export const getPaginatedMemories = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            reason: "internal server error",
            message: error.message,
        })
    }
};


