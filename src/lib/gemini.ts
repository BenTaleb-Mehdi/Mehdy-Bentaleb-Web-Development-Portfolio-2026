import portfolioData from "../data/portfolio.json";

/**
 * Antigravity Logic: High-end Minimalist AI Configuration
 * Specialized for Mehdi Bentaleb's Portfolio v1.0
 * Features: Auto-Discovery for Model Availability
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const isKeyConfigured = !!API_KEY && API_KEY.startsWith("AIza") && API_KEY.length > 30;

// List of models to try in order of preference
const MODELS_TO_TRY = [
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-pro"
];

// Persistent cache for the working model
let cachedWorkingModel: string | null = null;

const SYSTEM_INSTRUCTION = `
You are the Technical Assistant for Mehdi Bentaleb, a Full-Stack Web Developer specialized in the Laravel ecosystem.
Your goal is to provide accurate, professional, and helpful information to visitors of his portfolio.

BIOGRAPHY & ROLE:
- Role: ${portfolioData.profile.role}
- Tagline: ${portfolioData.profile.tagline}
- Philosophy: ${portfolioData.profile.aboutText}
- Location: ${portfolioData.profile.location}
- Experience: ${portfolioData.profile.experience} years
- Availability: ${portfolioData.profile.availability}

TECHNICAL SKILLS (Stack):
${portfolioData.stack.map(s => `- ${s.title}`).join("\n")}

EDUCATION:
${portfolioData.education.map(e => `- ${e.degree} at ${e.school} (${e.duration}): ${e.description}`).join("\n")}

PROFESSIONAL EXPERIENCE:
${portfolioData.experience.map(exp => `- ${exp.role} at ${exp.company} (${exp.period}): ${exp.description}`).join("\n")}

PROJECTS:
${portfolioData.projects.map(p => `- ${p.title} (${p.type}): ${p.description}`).join("\n")}

CONTACT & SOCIALS:
- Email: ${portfolioData.profile.email}
${portfolioData.navigation.socialItems.map(s => `- ${s.label}: ${s.link}`).join("\n")}

GUIDELINES:
1. Tone: Professional, technical, yet friendly and minimalist.
2. Language: Always respond using the SAME LANGUAGE as the user (English, French, or Arabic/Darija).
3. Brevity: Keep answers concise (max 3-4 sentences) unless technical depth is requested.
4. Accuracy: Only use the information provided above. If asked about something not listed, politely direct them to the Contact section or Mehdi's email.
5. Context: If the user asks "where did you study?", answer on behalf of Mehdi (e.g., "I studied at Miage Tangier...").
`;

export interface ChatHistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function getGeminiResponse(userMessage: string, history: ChatHistoryItem[] = []) {
  if (!isKeyConfigured) {
    return "The assistant is offline. Please check the API Key.";
  }

  // Try cached model first, or start discovery
  const models = cachedWorkingModel ? [cachedWorkingModel] : MODELS_TO_TRY;

  for (const modelName of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
      
      const payload = {
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [
          ...history.map(h => ({ role: h.role, parts: h.parts })),
          { role: "user", parts: [{ text: userMessage }] }
        ],
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiResponse) {
          cachedWorkingModel = modelName; // Save for future requests
          return aiResponse;
        }
      }

      // If 404, we continue to the next model
      if (response.status === 404) {
        console.warn(`[Cortex] Model ${modelName} not found. Trying next...`);
        continue;
      }

      // If other error, log and throw
      const errorData = await response.json();
      console.error(`[Cortex] API Error (${modelName}):`, errorData.error);
      throw new Error(errorData.error?.message || "Failed to fetch");

    } catch (error: any) {
      if (cachedWorkingModel) {
        cachedWorkingModel = null; // Reset cache on failure
      }
      console.error(`[Cortex] Discovery failed for ${modelName}:`, error.message);
    }
  }

  return "I'm having trouble connecting to my specialized models right now. Please try again or contact Mehdi directly!";
}