import UserModel from "../models/user.model.js";

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

        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: password,
            profileImage: null,
        });

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: newUser,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
            data: newUser,
        });
    }
};

export const getUser = async (req, res) => {
    try {

    } catch (error) {

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
