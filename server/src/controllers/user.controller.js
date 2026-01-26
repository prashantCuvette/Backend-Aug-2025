import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../utils/generateToken.util.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "user already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            profileImage: null,
        });

        const dataToBeSent = await UserModel.findById(newUser._id).select("-password -createdAt -updatedAt -__v");

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: dataToBeSent,
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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        // verify email
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "user not found, incorrect email",
            });
        }

        // password
        const validatePassword = await bcrypt.compare(password, existingUser.password);
        if (!validatePassword) {
            return res.status(400).json({
                success: false,
                message: "password is incorrect",
            });
        }

        const dataToBeSent = await UserModel.findById(existingUser._id).select("-password -createdAt -updatedAt -__v");

        // Add JSON token
        // localstoarge = manipulate dby client, token may be tampered
        // cookies

        const generateToken = generateJWTToken({
            _id: dataToBeSent._id,
            email: dataToBeSent.email,
        });

        res.cookie("accessToken", generateToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 100,
        });

        return res.status(201).json({
            success: true,
            message: "logged in successfully",
            data: dataToBeSent,
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

export const updateUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const detailsToBeUpdated = req.body;

        const findUser = await UserModel.findById(_id);
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        findUser.name = detailsToBeUpdated?.name ? detailsToBeUpdated.name : findUser.name;
        const newPassword = detailsToBeUpdated?.password;
        if(newPassword){
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            findUser.password = hashedPassword;
        }
        await findUser.save();

        const dataToBeSent = await UserModel.findById(findUser._id).select("-password -createdAt -updatedAt -__v");

        return res.status(200).json({
            success: true,
            message: "user details updated",
            data: dataToBeSent,
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

export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.user;

        const findUser = await UserModel.findById(_id);
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        await findUser.deleteOne();

        res.clearCookie("accessToken");

        return res.status(200).json({
            success: true,
            message: "user has been deleted",
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

export const logoutUser = async (req, res) => {
    try {
        const { _id } = req.user;

        const findUser = await UserModel.findById(_id);
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        res.clearCookie("accessToken");

        return res.status(200).json({
            success: true,
            message: "user has been logged out successfully",
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

