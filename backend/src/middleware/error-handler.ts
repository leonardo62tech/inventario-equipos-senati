import type { ErrorRequestHandler, RequestHandler } from "express";
import { ApiError } from "../errors.js";

export const notFoundHandler: RequestHandler = (_request, response): void => {
  response.status(404).json({ message: "Ruta no encontrada" });
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next): void => {
  if (error instanceof ApiError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error("Error no controlado", error);
  response.status(500).json({ message: "Ocurrio un error interno en el servidor" });
};

