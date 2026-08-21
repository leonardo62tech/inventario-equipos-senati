# Sistema de Inventario de Equipos

Aplicacion full-stack para administrar el inventario de equipos de computo de un laboratorio. Permite crear, listar, editar y eliminar equipos, incluyendo datos como nombre, marca, numero de serie, estado y ubicacion.

## Tecnologias

- **Frontend:** React, Vite y TypeScript.
- **Backend:** Node.js, Express y TypeScript estricto.
- **Base de datos:** PostgreSQL.
- **Documentacion:** Swagger / OpenAPI.
- **Contenedores:** Docker y Docker Compose.

## Ejecutar con Docker

1. Copia el archivo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

   En Windows PowerShell puedes usar:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Si lo deseas, cambia `POSTGRES_PASSWORD` y actualiza `DATABASE_URL` con la misma clave.

3. Levanta los tres servicios:

   ```bash
   docker compose up --build
   ```

4. Abre la aplicacion en [http://localhost:5173](http://localhost:5173).

5. Consulta y prueba la documentacion Swagger en [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

Para detener los servicios:

```bash
docker compose down
```

Para eliminar tambien los datos locales de PostgreSQL:

```bash
docker compose down -v
```

## Variables de entorno

El archivo `.env.example` contiene todas las variables requeridas:

| Variable | Uso |
| --- | --- |
| `POSTGRES_DB` | Nombre de la base de datos. |
| `POSTGRES_USER` | Usuario de PostgreSQL. |
| `POSTGRES_PASSWORD` | Clave de PostgreSQL. |
| `DATABASE_URL` | Cadena de conexion que usa el backend. |
| `BACKEND_PORT` | Puerto publicado por la API. |
| `CORS_ORIGIN` | Origen permitido para el frontend fuera de Docker. |
| `VITE_API_URL` | URL de la API al ejecutar el frontend localmente. |

## Endpoints principales

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| `GET` | `/api/equipments` | Lista los equipos. |
| `GET` | `/api/equipments/:id` | Obtiene un equipo por id. |
| `POST` | `/api/equipments` | Registra un equipo. |
| `PUT` | `/api/equipments/:id` | Actualiza un equipo. |
| `DELETE` | `/api/equipments/:id` | Elimina un equipo. |

## Desarrollo sin Docker

Necesitas una instancia de PostgreSQL y una `DATABASE_URL` que apunte a ella.

```bash
cd backend
pnpm install
pnpm dev
```

En otra terminal:

```bash
cd frontend
pnpm install
pnpm dev
```

## Flujo de Git propuesto

El repositorio ya incluye una estructura para trabajar desde `main` hacia `development`, con ramas por funcionalidad. Consulta [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md) para publicar el repositorio y crear los dos Pull Requests requeridos por la prueba.

## Verificación

Con Docker Compose activo, la aplicación queda disponible en:

- Frontend: http://localhost:5173
- Swagger / OpenAPI: http://localhost:3000/api/docs

La documentación Swagger permite consultar y probar los endpoints de la API de inventario.