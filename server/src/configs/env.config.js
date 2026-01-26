import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT);
if (!port) {
    throw new Error("PORT is undefined");
}

const mongoUri = String(process.env.MONGO_URI);
if (!mongoUri) {
    throw new Error("MONGO_URI is undefined");
}

const jwtToken = String(process.env.JWT_TOKEN);
if (!jwtToken) {
    throw new Error("JWT_TOKEN is undefined");
}

const cloudinaryCloudName = String(process.env.CLOUDINARY_CLOUD_NAME);
if (!cloudinaryCloudName) {
    throw new Error("CLOUDINARY_CLOUD_NAME is undefined");
}

const cloudinaryApiKey = String(process.env.CLOUDINARY_API_KEY);
if (!cloudinaryApiKey) {
    throw new Error("CLOUDINARY_CLOUD_NAME is undefined");
}

const cloudinaryApiSecret = String(process.env.CLOUDINARY_API_SECRET);
if (!cloudinaryApiSecret) {
    throw new Error("CLOUDINARY_CLOUD_NAME is undefined");
}

const clientUrl = String(process.env.CLIENT_URL);
if (!clientUrl) {
    throw new Error("CLIENT_URL is undefined");
}


const envObj = Object.freeze({
    port,
    mongoUri,
    jwtToken,
    cloudinaryCloudName,
    cloudinaryApiKey,
    cloudinaryApiSecret,
    clientUrl,
});

export default envObj;