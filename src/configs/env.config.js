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

const envObj = Object.freeze({
    port,
    mongoUri,
});

export default envObj;