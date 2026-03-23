export interface ChatHistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function getGeminiResponse(userMessage: string, history: ChatHistoryItem[] = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage, history })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from API');
    }

    const data = await response.json();
    return data.response;
  } catch (error: any) {
    console.error(`[Cortex] Error:`, error.message);
    return "I'm having trouble connecting to my specialized models right now. Please try again or contact Mehdi directly!";
  }
}