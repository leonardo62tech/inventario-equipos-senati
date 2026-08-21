import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env.js";
import { openapiDocument } from "./config/openapi.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { equipmentRouter } from "./routes/equipment.routes.js";

export const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: "100kb" }));
app.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "inventario-backend"
  });
});
app.get("/api/openapi.json", (_request, response) => {
  response.status(200).json(openapiDocument);
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument, { explorer: true }));
app.use("/api/equipments", equipmentRouter);
app.use(notFoundHandler);
app.use(errorHandler);
