import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUser);
userRouter.patch("/", updateUser);
userRouter.delete("/", deleteUser);



export default userRouter;