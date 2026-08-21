import type { NextFunction, Request, Response } from "express";
import { equipmentService } from "../services/equipment.service.js";
import { parseEquipmentId, parseEquipmentPayload } from "../validators/equipment.schema.js";

export const equipmentController = {
  async list(_request: Request, response: Response, _next: NextFunction): Promise<void> {
    const equipments = await equipmentService.list();
    response.status(200).json(equipments);
  },

  async getById(request: Request, response: Response, _next: NextFunction): Promise<void> {
    const equipment = await equipmentService.findById(parseEquipmentId(request.params.id));
    response.status(200).json(equipment);
  },

  async create(request: Request, response: Response, _next: NextFunction): Promise<void> {
    const equipment = await equipmentService.create(parseEquipmentPayload(request.body as unknown));
    response.status(201).json(equipment);
  },

  async update(request: Request, response: Response, _next: NextFunction): Promise<void> {
    const equipment = await equipmentService.update(
      parseEquipmentId(request.params.id),
      parseEquipmentPayload(request.body as unknown)
    );
    response.status(200).json(equipment);
  },

  async remove(request: Request, response: Response, _next: NextFunction): Promise<void> {
    await equipmentService.remove(parseEquipmentId(request.params.id));
    response.status(204).send();
  }
};

