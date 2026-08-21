import { app } from "./app.js";
import { pool } from "./config/database.js";
import { env } from "./config/env.js";

const start = async (): Promise<void> => {
  await pool.query("SELECT 1");

  app.listen(env.PORT, () => {
    console.log(`API disponible en http://localhost:${env.PORT}`);
    console.log(`Swagger disponible en http://localhost:${env.PORT}/api/docs`);
  });
};

void start().catch((error: unknown) => {
  console.error("No se pudo iniciar la API", error);
  process.exit(1);
});

