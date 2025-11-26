import { clerkPlugin, getAuth } from "@clerk/fastify";
import Fastify from "fastify";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", (request, reply) => {
  const { userId } = getAuth(request);
  if (!userId)
    return reply.status(401).send({ message: "You are not logged in." });
  reply.status(200).send({ message: "Order Service is Authenticated" });
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
