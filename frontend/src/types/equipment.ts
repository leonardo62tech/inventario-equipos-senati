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

export interface EquipmentInput {
  name: string;
  brand: string;
  serialNumber: string;
  status: EquipmentStatus;
  location: string;
  purchaseDate: string | null;
  notes: string | null;
}

export interface EquipmentFormValues {
  name: string;
  brand: string;
  serialNumber: string;
  status: EquipmentStatus;
  location: string;
  purchaseDate: string;
  notes: string;
}

export const emptyEquipmentForm = (): EquipmentFormValues => ({
  name: "",
  brand: "",
  serialNumber: "",
  status: "OPERATIVO",
  location: "",
  purchaseDate: "",
  notes: ""
});

export const toFormValues = (equipment: Equipment): EquipmentFormValues => ({
  name: equipment.name,
  brand: equipment.brand,
  serialNumber: equipment.serialNumber,
  status: equipment.status,
  location: equipment.location,
  purchaseDate: equipment.purchaseDate ?? "",
  notes: equipment.notes ?? ""
});

export const toEquipmentInput = (values: EquipmentFormValues): EquipmentInput => ({
  name: values.name.trim(),
  brand: values.brand.trim(),
  serialNumber: values.serialNumber.trim(),
  status: values.status,
  location: values.location.trim(),
  purchaseDate: values.purchaseDate || null,
  notes: values.notes.trim() || null
});

