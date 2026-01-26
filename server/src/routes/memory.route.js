import { Router } from "express";
import { authenticateUser } from "../middlewares/user.middleware.js";
import { createMemory, deleteMemory, getMemory, updateMemory } from "../controllers/memory.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const memoryRouter = Router();

memoryRouter.use(authenticateUser);

memoryRouter.post("/", upload.single("image"), createMemory);
memoryRouter.patch("/:memoriesId", upload.single("image"), updateMemory);
memoryRouter.delete("/:memoriesId", deleteMemory);
memoryRouter.get("/:memoriesId", getMemory); // always write dynamic path at last

export default memoryRouter;