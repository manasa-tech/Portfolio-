import { model } from "../config/gemini";
import { buildPrompt } from "../utils/prompts";
import { getPortfolioData } from "./portfolioService";

export async function askGemini(userMessage: string): Promise<string> {
  try {
    // Fetch portfolio data
    const portfolioData = await getPortfolioData();

    // Build the prompt
    const prompt = buildPrompt(userMessage, portfolioData);

    // Generate Gemini response
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error: any) {
  console.error("========== GEMINI ERROR ==========");
  console.error(error);
  console.error("Message:", error?.message);
  console.error("=================================");

  return error?.message || "Unknown Error";
}
}