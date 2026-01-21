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

const envObj = Object.freeze({
    port,
    mongoUri,
    jwtToken,
});

export default envObj;