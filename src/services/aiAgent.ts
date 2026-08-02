import { buildPrompt } from "./promptBuilder";
import { addMessage } from "./memory";
import { askGemini } from "./geminiService";

class AIAgent {
  async chat(message: string) {
    addMessage({
      role: "user",
      content: message,
    });

    const prompt = buildPrompt(message);

    const reply = await askGemini(prompt);

    addMessage({
      role: "assistant",
      content: reply,
    });

    return reply;
  }
}

export default new AIAgent();