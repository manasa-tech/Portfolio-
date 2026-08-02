import systemPrompt from "./systemPrompt";
import { getMemory } from "./memory";
import { tools } from "./tools";

export function buildPrompt(userMessage: string) {
  const history = getMemory()
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  return `
${systemPrompt}

Portfolio Information

${tools.portfolio()}

${tools.resume()}

${tools.contact()}

Conversation

${history}

User:
${userMessage}

Assistant:
`;
}