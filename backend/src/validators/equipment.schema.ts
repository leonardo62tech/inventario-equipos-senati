import { z } from "zod";
import { EQUIPMENT_STATUSES, type CreateEquipmentInput } from "../types/equipment.js";
import { ApiError } from "../errors.js";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .nullable()
    .optional()
    .transform((value) => value || null);

const equipmentPayloadSchema = z
  .object({
    name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(120),
    brand: z.string().trim().min(2, "La marca debe tener al menos 2 caracteres").max(80),
    serialNumber: z
      .string()
      .trim()
      .min(3, "El numero de serie debe tener al menos 3 caracteres")
      .max(100),
    status: z.enum(EQUIPMENT_STATUSES),
    location: z.string().trim().min(2, "La ubicacion debe tener al menos 2 caracteres").max(120),
    purchaseDate: z.string().date("La fecha debe usar el formato YYYY-MM-DD").nullable().optional(),
    notes: optionalText(2000)
  })
  .strict();

const idSchema = z.coerce.number().int().positive();

const formatIssues = (issues: z.ZodIssue[]): string =>
  issues.map((issue) => `${issue.path.join(".") || "valor"}: ${issue.message}`).join("; ");

export const parseEquipmentPayload = (payload: unknown): CreateEquipmentInput => {
  const parsed = equipmentPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError(400, `Datos invalidos: ${formatIssues(parsed.error.issues)}`);
  }

  return parsed.data;
};

export const parseEquipmentId = (value: string | string[] | undefined): number => {
  if (typeof value !== "string") {
    throw new ApiError(400, "El id debe ser un numero entero positivo");
  }

  const parsed = idSchema.safeParse(value);
  if (!parsed.success) {
    throw new ApiError(400, "El id debe ser un numero entero positivo");
  }

  return parsed.data;
};
