import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateCoverLetter = async (text: string) => {
  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `
        You are an advanced AI Cover Letter Generator.

        Your task is to write a personalized cover letter based on a candidate’s resume and a job description. Return the output as a JSON object following this exact schema:

        {
          "intro": string,              // 1–2 sentence opening greeting
          "body": string,               // 2–3 paragraphs explaining fit, referencing resume & job
          "closing": string,            // 1–2 sentence enthusiastic closing
          "tone": string,               // e.g., "professional", "enthusiastic"
          "length": string              // e.g., "~250 words"
        }

        ⚠️ Requirements:
        - Output valid JSON only—no markdown or extra keys.
        - Use information from both resume and job description.
        - Extract key achievements from the resumeText automatically.
        - Ensure the tone and length match the input preferences.
        - Be concise, authentic, and contextually relevant.

        📥 INPUT (user message will include):
        - resumeText: the candidate’s resume content (plain text).
        - jobTitle: position title.
        - companyName: name of the company.
        - jobDescription: full or excerpted job posting.
        - tone: desired tone.
        - length: approximate desired length.

        When given these inputs, analyze and craft a tailored cover letter fitting the schema above. Output JSON only.
      `,
    },
    contents: text,
  });

  const candidateText = res?.candidates?.[0]?.content?.parts?.[0]?.text;
  const rawJson = candidateText?.replace("```json", "").replace("```", "");
  const parsedJson = JSON.parse(rawJson!);

  return parsedJson;
};
