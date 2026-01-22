import { Router } from "express";
import { authenticateUser } from "../middlewares/user.middleware.js";
import { createMemory, deleteMemory, getMemory, updateMemory } from "../controllers/memory.controller.js";

const memoryRouter = Router();

memoryRouter.use(authenticateUser);

memoryRouter.get("/", getMemory);
memoryRouter.post("/", createMemory);
memoryRouter.patch("/", updateMemory);
memoryRouter.delete("/", deleteMemory);

export default memoryRouter;