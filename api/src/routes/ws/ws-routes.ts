import type { FastifyPluginAsync } from "fastify";
import { randomUUID } from "node:crypto";

const wsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", { websocket: true }, (socket, request) => {
    const id = randomUUID();

    socket.send(JSON.stringify({ tipo: "bienvenida", id }));
  });
};

export default wsRoutes;