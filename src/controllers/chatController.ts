import { Request, Response } from "express";
import { askGemini } from "../services/geminiService";

export const chat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;

    // Validate request
    if (!message || typeof message !== "string") {
      res.status(400).json({
        success: false,
        reply: "Message is required.",
      });
      return;
    }

    console.log("User Message:", message);

    // Get AI response
    const reply = await askGemini(message);

    console.log("Gemini Reply:", reply);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error: any) {
    console.error("========== CHAT CONTROLLER ERROR ==========");
    console.error(error);
    console.error("Message:", error?.message);
    console.error("Stack:", error?.stack);
    console.error("===========================================");

    res.status(500).json({
      success: false,
      reply: "Internal Server Error",
      error: error?.message,
    });
  }
};