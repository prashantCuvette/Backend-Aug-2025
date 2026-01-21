import { Router } from "express";
import { createUser, loginUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/user.middleware.js";

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.patch("/", authenticateUser, updateUser);
userRouter.delete("/", authenticateUser, deleteUser);



export default userRouter;