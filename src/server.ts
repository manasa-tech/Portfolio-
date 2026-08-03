import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat";
import testRoutes from "./routes/test";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/test", testRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});