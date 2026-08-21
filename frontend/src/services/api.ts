import type { Equipment, EquipmentInput } from "../types/equipment";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface ErrorPayload {
  message?: string;
}

const isErrorPayload = (value: unknown): value is ErrorPayload =>
  typeof value === "object" && value !== null && "message" in value;

export class ApiError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const request = async <ResponseType>(path: string, init?: RequestInit): Promise<ResponseType> => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers
      }
    });
  } catch {
    throw new ApiError("No se pudo conectar con la API. Verifica que el backend este disponible.");
  }

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    const message = isErrorPayload(payload) && typeof payload.message === "string"
      ? payload.message
      : "La solicitud no se pudo completar";
    throw new ApiError(message);
  }

  if (response.status === 204) {
    return undefined as ResponseType;
  }

  return (await response.json()) as ResponseType;
};

export const equipmentApi = {
  list: (): Promise<Equipment[]> => request<Equipment[]>("/equipments"),
  create: (input: EquipmentInput): Promise<Equipment> =>
    request<Equipment>("/equipments", { method: "POST", body: JSON.stringify(input) }),
  update: (id: number, input: EquipmentInput): Promise<Equipment> =>
    request<Equipment>(`/equipments/${id}`, { method: "PUT", body: JSON.stringify(input) }),
  remove: (id: number): Promise<void> => request<void>(`/equipments/${id}`, { method: "DELETE" })
};

