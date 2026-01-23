import { v2 as cloudinary } from "cloudinary"
import envObj from "./env.config.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: envObj.cloudinaryCloudName,
    api_key: envObj.cloudinaryApiKey,
    api_secret: envObj.cloudinaryApiSecret,
});

export default cloudinary;
