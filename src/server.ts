import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./config/database";
import githubRouter from "./routes/github";
import testRouter from "./routes/test";
import chatRoutes from "./routes/chat";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/test", testRouter);
app.use("/api/chat", chatRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running...");
});

async function connectDatabase() {
  try {
    await client.connect();
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL:", error);
  }
}

connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});