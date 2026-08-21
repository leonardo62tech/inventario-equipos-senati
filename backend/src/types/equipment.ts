export const EQUIPMENT_STATUSES = [
  "OPERATIVO",
  "MANTENIMIENTO",
  "FUERA_DE_SERVICIO"
] as const;

export type EquipmentStatus = (typeof EQUIPMENT_STATUSES)[number];

export interface Equipment {
  id: number;
  name: string;
  brand: string;
  serialNumber: string;
  status: EquipmentStatus;
  location: string;
  purchaseDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEquipmentInput {
  name: string;
  brand: string;
  serialNumber: string;
  status: EquipmentStatus;
  location: string;
  purchaseDate?: string | null | undefined;
  notes?: string | null | undefined;
}

export type UpdateEquipmentInput = CreateEquipmentInput;
