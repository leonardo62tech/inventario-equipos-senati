import { pool } from "../config/database.js";
import { ApiError } from "../errors.js";
import type {
  CreateEquipmentInput,
  Equipment,
  EquipmentStatus,
  UpdateEquipmentInput
} from "../types/equipment.js";

interface EquipmentRow {
  id: number;
  name: string;
  brand: string;
  serial_number: string;
  status: EquipmentStatus;
  location: string;
  purchase_date: string | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

const selectFields = `
  id, name, brand, serial_number, status, location,
  purchase_date::text AS purchase_date, notes, created_at, updated_at
`;

const mapEquipment = (row: EquipmentRow): Equipment => ({
  id: row.id,
  name: row.name,
  brand: row.brand,
  serialNumber: row.serial_number,
  status: row.status,
  location: row.location,
  purchaseDate: row.purchase_date,
  notes: row.notes,
  createdAt: row.created_at.toISOString(),
  updatedAt: row.updated_at.toISOString()
});

const isUniqueViolation = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  return error.code === "23505";
};

export const equipmentService = {
  async list(): Promise<Equipment[]> {
    const result = await pool.query<EquipmentRow>(
      `SELECT ${selectFields} FROM equipments ORDER BY id DESC`
    );
    return result.rows.map(mapEquipment);
  },

  async findById(id: number): Promise<Equipment> {
    const result = await pool.query<EquipmentRow>(
      `SELECT ${selectFields} FROM equipments WHERE id = $1`,
      [id]
    );
    const equipment = result.rows[0];

    if (!equipment) {
      throw new ApiError(404, "Equipo no encontrado");
    }

    return mapEquipment(equipment);
  },

  async create(input: CreateEquipmentInput): Promise<Equipment> {
    try {
      const result = await pool.query<EquipmentRow>(
        `INSERT INTO equipments (
          name, brand, serial_number, status, location, purchase_date, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING ${selectFields}`,
        [
          input.name,
          input.brand,
          input.serialNumber,
          input.status,
          input.location,
          input.purchaseDate ?? null,
          input.notes ?? null
        ]
      );

      const equipment = result.rows[0];
      if (!equipment) {
        throw new ApiError(500, "No se pudo registrar el equipo");
      }
      return mapEquipment(equipment);
    } catch (error: unknown) {
      if (isUniqueViolation(error)) {
        throw new ApiError(409, "El numero de serie ya esta registrado");
      }
      throw error;
    }
  },

  async update(id: number, input: UpdateEquipmentInput): Promise<Equipment> {
    try {
      const result = await pool.query<EquipmentRow>(
        `UPDATE equipments SET
          name = $1,
          brand = $2,
          serial_number = $3,
          status = $4,
          location = $5,
          purchase_date = $6,
          notes = $7
        WHERE id = $8
        RETURNING ${selectFields}`,
        [
          input.name,
          input.brand,
          input.serialNumber,
          input.status,
          input.location,
          input.purchaseDate ?? null,
          input.notes ?? null,
          id
        ]
      );

      const equipment = result.rows[0];
      if (!equipment) {
        throw new ApiError(404, "Equipo no encontrado");
      }
      return mapEquipment(equipment);
    } catch (error: unknown) {
      if (isUniqueViolation(error)) {
        throw new ApiError(409, "El numero de serie ya esta registrado");
      }
      throw error;
    }
  },

  async remove(id: number): Promise<void> {
    const result = await pool.query("DELETE FROM equipments WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      throw new ApiError(404, "Equipo no encontrado");
    }
  }
};

