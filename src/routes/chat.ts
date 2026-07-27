import { Router } from "express";
import { chat } from "../controllers/chatController";

const router = Router();

router.post("/", chat);

// Optional: Test route
router.get("/", (req, res) => {
  res.send("Chat API is working!");
});

export default router;