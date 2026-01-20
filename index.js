import express from "express";
import envObj from "./src/configs/env.config.js";
import connectToDatabase from "./src/configs/db.config.js";
import userRouter from "./src/routes/user.route.js";

const app = express();
app.use(express.json()); // for reading data from body


app.get("/", (req, res) => {
    res.send("Backend API is Working");
})


app.use("/api/v1/users", userRouter);

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




