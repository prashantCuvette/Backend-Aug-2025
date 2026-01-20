import express from "express";
import envObj from "./src/configs/env.config.js";
import connectToDatabase from "./src/configs/db.config.js";


const app = express();


app.use("")


async function connectDB() {
    try {
        await connectToDatabase();
        app.listen(envObj.port, () => {
            console.log("Server Running");
        });
    } catch (error) {

    }

}

connectDB();




