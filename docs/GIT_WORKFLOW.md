# Flujo de Git y Pull Requests

La prueba solicita una rama `development`, ramas por funcionalidad y al menos dos Pull Requests fusionados. Una secuencia sugerida es:

1. Publicar este directorio como un repositorio publico en GitHub.
2. Subir `main` y crear `development` desde ella.
3. Crear `feature/backend-crud-swagger` desde `development`, completar o revisar la API y abrir un PR hacia `development`.
4. Crear `feature/frontend-ui-docker` desde `development`, completar o revisar la interfaz y Docker, y abrir un segundo PR hacia `development`.
5. Fusionar ambos PRs con una descripcion que indique funcionalidad, pruebas realizadas y capturas si corresponde.
6. Abrir un PR final de `development` hacia `main` cuando la entrega este validada.

Ejemplo de comandos para asociar el repositorio remoto, despues de crearlo en GitHub:

```bash
git remote add origin https://github.com/TU-USUARIO/inventario-equipos-senati.git
git push -u origin main
git push -u origin development
git push -u origin feature/backend-crud-swagger
git push -u origin feature/frontend-ui-docker
```

Titulos sugeridos para los PRs:

- `feat: implementar CRUD de equipos y documentacion Swagger`
- `feat: agregar interfaz React y orquestacion Docker`

