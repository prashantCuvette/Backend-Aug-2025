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

        const dataToBeSent = await UserModel.findById(newUser._id).select("-password");

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: dataToBeSent,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
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

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        const dataToBeSent = await UserModel.findById(existingUser._id).select("-password");

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

    } catch (error) {

    }
};

export const deleteUser = async (req, res) => {
    try {

    } catch (error) {

    }
};


