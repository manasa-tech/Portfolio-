export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const memory: ChatMessage[] = [];

export function addMessage(message: ChatMessage) {
  memory.push(message);

  if (memory.length > 20) {
    memory.shift();
  }
}

export function getMemory() {
  return memory;
}

export function clearMemory() {
  memory.length = 0;
}