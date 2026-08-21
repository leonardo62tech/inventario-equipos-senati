export const openapiDocument = {
  openapi: "3.0.3",
  info: {
    title: "API de Inventario de Equipos",
    version: "1.0.0",
    description: "API REST para administrar equipos de computo de un laboratorio."
  },
  servers: [{ url: "http://localhost:3000", description: "Servidor local" }],
  tags: [{ name: "Equipos", description: "Operaciones CRUD del inventario" }],
  paths: {
    "/health": {
      get: {
        summary: "Verifica el estado de la API",
        responses: { "200": { description: "API disponible" } }
      }
    },
    "/api/equipments": {
      get: {
        tags: ["Equipos"],
        summary: "Lista los equipos",
        responses: {
          "200": {
            description: "Listado de equipos",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Equipment" } }
              }
            }
          }
        }
      },
      post: {
        tags: ["Equipos"],
        summary: "Registra un equipo",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/EquipmentInput" } } }
        },
        responses: {
          "201": { description: "Equipo creado", content: { "application/json": { schema: { $ref: "#/components/schemas/Equipment" } } } },
          "400": { $ref: "#/components/responses/ValidationError" },
          "409": { description: "Numero de serie duplicado" }
        }
      }
    },
    "/api/equipments/{id}": {
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } }],
      get: {
        tags: ["Equipos"],
        summary: "Obtiene un equipo por id",
        responses: {
          "200": { description: "Equipo encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Equipment" } } } },
          "404": { description: "Equipo no encontrado" }
        }
      },
      put: {
        tags: ["Equipos"],
        summary: "Actualiza un equipo",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/EquipmentInput" } } }
        },
        responses: {
          "200": { description: "Equipo actualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Equipment" } } } },
          "400": { $ref: "#/components/responses/ValidationError" },
          "404": { description: "Equipo no encontrado" },
          "409": { description: "Numero de serie duplicado" }
        }
      },
      delete: {
        tags: ["Equipos"],
        summary: "Elimina un equipo",
        responses: {
          "204": { description: "Equipo eliminado" },
          "404": { description: "Equipo no encontrado" }
        }
      }
    }
  },
  components: {
    schemas: {
      EquipmentInput: {
        type: "object",
        required: ["name", "brand", "serialNumber", "status", "location"],
        properties: {
          name: { type: "string", example: "Laptop Latitude 5440" },
          brand: { type: "string", example: "Dell" },
          serialNumber: { type: "string", example: "DL-5440-001" },
          status: { type: "string", enum: ["OPERATIVO", "MANTENIMIENTO", "FUERA_DE_SERVICIO"], example: "OPERATIVO" },
          location: { type: "string", example: "Laboratorio 101" },
          purchaseDate: { type: "string", format: "date", nullable: true, example: "2024-03-15" },
          notes: { type: "string", nullable: true, example: "Equipo para desarrollo web" }
        }
      },
      Equipment: {
        allOf: [
          { $ref: "#/components/schemas/EquipmentInput" },
          {
            type: "object",
            required: ["id", "createdAt", "updatedAt"],
            properties: {
              id: { type: "integer", example: 1 },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          }
        ]
      }
    },
    responses: {
      ValidationError: {
        description: "Datos de entrada invalidos",
        content: { "application/json": { schema: { type: "object", properties: { message: { type: "string" } } } } }
      }
    }
  }
};
