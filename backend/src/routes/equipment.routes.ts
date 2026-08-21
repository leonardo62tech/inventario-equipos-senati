import { Router } from "express";
import { equipmentController } from "../controllers/equipment.controller.js";
import { asyncHandler } from "../middleware/async-handler.js";

export const equipmentRouter = Router();

equipmentRouter.get("/", asyncHandler(equipmentController.list));
equipmentRouter.get("/:id", asyncHandler(equipmentController.getById));
equipmentRouter.post("/", asyncHandler(equipmentController.create));
equipmentRouter.put("/:id", asyncHandler(equipmentController.update));
equipmentRouter.delete("/:id", asyncHandler(equipmentController.remove));

