import { Pool } from "pg";
import { env } from "./env.js";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
});

pool.on("error", (error: Error) => {
  console.error("Error inesperado en un cliente PostgreSQL", error);
});

