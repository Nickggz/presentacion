# Proyecto base

Esqueleto con la misma estructura y diseño que `tareaViernes30`, pero vacío: sin base de datos, sin autenticación y sin entidades.

- `api/`: Fastify + TypeScript (plugins de CORS, sensible y Swagger en `/docs`). Las rutas van en `src/routes`, los esquemas en `src/schemas` y los errores en `src/errors`.
- `front/`: Angular con el layout (header, sidebar, footer), notificaciones, Home y página 404.

## Levantar

```bash
cd api && npm install && npm run dev
cd front && npm install && npm start
```
