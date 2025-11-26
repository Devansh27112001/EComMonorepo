import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";

const app = express();

app.use(clerkMiddleware());
app.use(
  cors({
    origin: ["https://localhost:3002", "https://localhost:3003"],
    credentials: true,
  })
);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", (req, res) => {
  const auth = getAuth(req);

  if (!auth.userId)
    return res.status(401).json({ message: "User not authenticated" });

  res.json({ message: "Product service authenticated" });
});
app.listen(8003, () => {
  console.log("Product service is running successfully");
});
