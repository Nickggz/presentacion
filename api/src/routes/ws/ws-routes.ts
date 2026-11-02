import type { FastifyPluginAsync } from "fastify";
import { randomUUID } from "node:crypto";

const wsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", { websocket: true }, (socket, request) => {
    const id = randomUUID();

    socket.send(JSON.stringify({ tipo: "bienvenida", id }));

    socket.on("message", (datos) => {
      try {
        const recibido = JSON.parse(datos.toString());

        const posicion = {
          tipo: "posicion",
          id,
          lat: recibido.lat,
          lng: recibido.lng,
          precision: recibido.precision,
        };

        fastify.websocketServer.clients.forEach((cliente) => {
          if (cliente !== socket && cliente.readyState === cliente.OPEN) {
            cliente.send(JSON.stringify(posicion));
          }
        });
      } catch {
        socket.send(JSON.stringify({ tipo: "error", mensaje: "Mensaje inválido" }));
      }
    });
  });
};

export default wsRoutes;