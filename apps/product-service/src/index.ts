import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["https://localhost:3002", "https://localhost:3003"],
    credentials: true,
  })
);

app.listen(8000, () => {
  console.log("Product service is running successfully");
});
