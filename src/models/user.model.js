import { Schema, model } from "mongoose";


const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,

        },
        dateOfBirth: {
            type: Date,
            default: null
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        profileImage: {
            type: String,
        },

    },
    {
        timestamps: true,
    }
);

const UserModel = model("user", userSchema);

export default UserModel;