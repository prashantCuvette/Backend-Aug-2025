import express from "express";
import envObj from "./src/configs/env.config.js";
import connectToDatabase from "./src/configs/db.config.js";
import userRouter from "./src/routes/user.route.js";
import cookieParser from "cookie-parser";
import memoryRouter from "./src/routes/memory.route.js";
import cors from "cors";

const app = express();
app.use(express.json()); // for reading data from body
app.use(cookieParser());
app.use(cors({
    origin: envObj.clientUrl,
    credentials: true,
}));


app.get("/", (req, res) => {
    res.send("Backend API is Working");
})


app.use("/api/v1/users", userRouter);
app.use("/api/v1/memories", memoryRouter);

// POST   => http://localhost:3000/api/v1/users/
// GET    => http://localhost:3000/api/v1/users/
// PATCH  => http://localhost:3000/api/v1/users/
// DELETE => http://localhost:3000/api/v1/users/


async function connectDB() {
    try {
        await connectToDatabase();
        app.listen(envObj.port, () => {
            console.log("Server Running");
        });
    } catch (error) {
        console.log(error);
        console.log("Failed Database Connection");
    }
}
connectDB();




