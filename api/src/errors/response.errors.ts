import createError from "@fastify/error";

export const BadRequestError = createError(
  "BADREQUEST",
  "Solicitud incorrecta. %s",
  400,
);
export const UnAuthenticatedError = createError(
  "UNAUTHENTICATED",
  "Credenciales inválidas. %s",
  401,
);
export const NotAuthorizedError = createError(
  "NOTAUTHORIZED",
  "No autorizado. %s",
  403,
);
export const NotFoundError = createError(
  "NOTFOUND",
  "Elemento no encontrado. %s",
  404,
);
export const ConflictError = createError(
  "CONFLICT",
  "Existe un conflicto en los datos. %s",
  409,
);

export const InternalError = createError("INTERNAL", "Error interno. %s", 500);
