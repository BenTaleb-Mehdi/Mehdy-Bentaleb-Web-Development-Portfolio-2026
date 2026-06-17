// app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Ygolhalik ila nsiti l-API Key
    if (!apiKey) {
      return NextResponse.json({ reply: "System Error: GEMINI_API_KEY is missing in .env.local file." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { message } = await req.json();
    
    // Khedmo b 1.5-flash 7it howa li srie3 o fih free tier
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
const prompt = `You are a helpful and professional AI assistant for Mehdi Bentaleb's portfolio. Mehdi is a Full-Stack Web Developer from Tangier, Morocco. 
    
    IMPORTANT RULES:
    1. Answer clearly, professionally, and keep your responses concise (max 2-3 sentences).
    2. You MUST reply in the exact same language the user used in their message. For example: if they write in Moroccan Darija, reply in Moroccan Darija. If they write in French, reply in French. If English, reply in English.
    3. If you reply in Moroccan Darija (using Latin characters), NEVER use hyphens (-) between prefixes and words. Write them connected. For example: write "lweb" instead of "l-web", "lktaba" instead of "l-ktaba", "lmochkil" instead of "l-mochkil".
    
    User says: ${message}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting to the brain right now. Try again later." }, { status: 500 });
  }
}