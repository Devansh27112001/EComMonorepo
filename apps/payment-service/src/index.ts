import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.use("*", clerkMiddleware());
app.get("/health", (c) => {
  c.status(200);
  return c.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ message: "You are not logged in" });
  }
  return c.json({ message: "Payment service is authenticated" });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Payment service running at PORT 8002`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
