import { clerkPlugin, getAuth } from "@clerk/fastify";
import Fastify from "fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  reply
    .status(200)
    .send({
      message: "Order Service is Authenticated",
      userId: request.userId,
    });
});
const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running at PORT 8001.");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
