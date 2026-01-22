import { Router } from "express";
import { createUser, loginUser, updateUser, deleteUser, logoutUser } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/user.middleware.js";

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.patch("/", authenticateUser, updateUser);
userRouter.delete("/", authenticateUser, deleteUser);
userRouter.get("/", authenticateUser, logoutUser);

export default userRouter;