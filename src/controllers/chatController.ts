import { Request, Response } from "express";
import { askGemini } from "../services/geminiService";

export const chat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({
        success: false,
        reply: "Message is required.",
      });
      return;
    }

    const reply = await askGemini(message);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);

    res.status(500).json({
      success: false,
      reply: "Something went wrong.",
    });
  }
};