const portfolioData = {
  "profile": {
    "name": "Mehdi Bentaleb",
    "role": "Full-Stack Web Developer Laravel",
    "email": "Mehdibentaleb548@gmail.com",
    "location": "Tangier, Morocco",
    "experience": 3,
    "availability": "Available for Projects / Full-time",
    "tagline": "BUILDING ROBUST & SCALABLE WEB ECOSYSTEMS.",
    "aboutText": "Specialized in building robust web applications using the Laravel ecosystem. I focus on backend architecture, MVC patterns, and Database optimization. My goal is to bridge the gap between complex logic and seamless user experiences, ensuring high performance and clean code standards."
  },
  "stack": [
    { "title": "Laravel" },
    { "title": "PHP" },
    { "title": "MySQL" },
    { "title": "Tailwind CSS" },
    { "title": "React" },
    { "title": "Next.js" },
    { "title": "Git" }
  ],
  "projects": [
    { "title": "StockMaster-Pro", "type": "Inventory Management System", "description": "Comprehensive retail inventory and client management solution." },
    { "title": "Kaftan Website 2026", "type": "E-commerce / Boutique Showcase", "description": "Elegant luxury fashion platform dedicated to traditional Moroccan Kaftans." },
    { "title": "SupplementStack", "type": "E-commerce / Supplement Catalog", "description": "Professional nutrition and supplement platform for fitness enthusiasts." },
    { "title": "GymFitness Frontend", "type": "Landing Page", "description": "High-performance landing page with smooth animations and BMI calculator." },
    { "title": "Gym Fitness", "type": "Interactive Landing Page", "description": "High-end immersive landing page featuring 3D visuals and smooth interactions." },
    { "title": "Market Store Management", "type": "Retail System", "description": "Professional retail management system for inventory control and automated reporting." },
    { "title": "Drive-Rent System", "type": "Car Rental Platform", "description": "Comprehensive platform for vehicle tracking and automated booking." }
  ],
  "education": [
    { "school": "Miage Tangier", "degree": "Technician specializing in IT development", "duration": "2022 - 2025" },
    { "school": "Solicode Tangier", "degree": "Full-Stack Web Development Path", "duration": "2025 - present" }
  ],
  "experience": [
    { "role": "Full-Stack Web Developer", "company": "Freelance Developer", "period": "2025/12 — PRESENT" },
    { "role": "Full-Stack Web Developer (PFE)", "company": "Miage Tangier", "period": "2025/04 — 2025/06" }
  ],
  "navigation": {
    "socialItems": [
      { "label": "GitHub", "link": "https://github.com/BenTaleb-Mehdi" },
      { "label": "LinkedIn", "link": "https://www.linkedin.com/in/mehdi-bentaleb" },
      { "label": "Instagram", "link": "https://www.instagram.com/mehdi__bentaleb/" }
    ]
  }
};

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
${portfolioData.education.map(e => `- ${e.degree} at ${e.school} (${e.duration})`).join("\n")}

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

const MODELS_TO_TRY = [
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-pro"
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userMessage, history } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Gemini API Key is not configured on the server.' });
  }

  for (const modelName of MODELS_TO_TRY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
      
      const payload = {
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [
          ...(history || []).map(h => ({ role: h.role, parts: h.parts })),
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
          return res.status(200).json({ response: aiResponse });
        }
      }

      if (response.status === 404) {
        continue;
      }

      const errorData = await response.json();
      console.error(`Gemini API Error (${modelName}):`, errorData.error);
      
    } catch (error) {
      console.error(`Fetch error for ${modelName}:`, error.message);
    }
  }

  return res.status(500).json({ error: 'Failed to get a response from Gemini API.' });
}
