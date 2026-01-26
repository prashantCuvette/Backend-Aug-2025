import fs from "node:fs";
import { uploadImage, deleteImage } from "../utils/cloudinary.util.js"
import MemoryModel from "../models/memory.model.js";

// fieldname, originalname, encoding, mimetype, buffer, size = 5382 byte, sent as kibibyte
export const createMemory = async (req, res) => {
    try {

        const { title, description } = req.body;
        const file = req.file;
        const { _id } = req.user;

        if (!title || !description || !file) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        fs.writeFileSync(`uploads/${req.file.originalname}`, req.file.buffer); // Store Image in Uploads folder
        const filePath =
            `${process.cwd()}/uploads/${req.file.originalname}`; // Create The Path Location
        const result = await uploadImage(filePath); // Pass The Path Location To Cloudinary Uplaod Method
        fs.unlinkSync(filePath); // Delete File From Server

        const newMemory = await MemoryModel.create({
            title,
            description,
            imageUrl: result.secure_url,
            userId: _id,
            imagePublidId: result.public_id,
        });
        res.status(201).json({
            success: true,
            message: "memory created",
            data: newMemory,
        });

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
        const { memoriesId } = req.params; // always received as string

        const findMemory = await MemoryModel.findById(memoriesId);
        if (!findMemory) {
            return res.status(404).json({
                success: false,
                message: "no memory present with this id"
            });
        }

        return res.status(200).json({
            success: true,
            message: "memory found",
            data: findMemory,
        });

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
        const dataToUpdate = req.body;
        const file = req.file;
        const { memoriesId } = req.params;

        const findMemory = await MemoryModel.findById(memoriesId);
        if (!findMemory) {
            return res.status(404).json({
                success: false,
                message: "no memory present with this id"
            });
        }

        findMemory.title = dataToUpdate.title ? dataToUpdate.title : findMemory.title;
        findMemory.description = dataToUpdate.description ? dataToUpdate.description : findMemory.description;

        if (file) {
            fs.writeFileSync(`uploads/${req.file.originalname}`, req.file.buffer);
            const filePath =
                `${process.cwd()}/uploads/${req.file.originalname}`;
            const result = await uploadImage(filePath);
            fs.unlinkSync(filePath);
            await deleteImage(findMemory.imagePublidId);
            findMemory.imageUrl = result.secure_url;
            findMemory.imagePublidId = result.public_id;
        }

        await findMemory.save();

        res.status(200).json({
            success: true,
            message: "memory updated successfully",
            data: findMemory,
        });

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
        const { memoriesId } = req.params;

        const findMemory = await MemoryModel.findById(memoriesId);
        if (!findMemory) {
            return res.status(404).json({
                success: false,
                message: "no memory present with this id"
            });
        }

        await deleteImage(findMemory.imagePublidId);
        await findMemory.deleteOne();

        return res.status(200).json({
            success: true,
            message: "memory deleted",
        });

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


