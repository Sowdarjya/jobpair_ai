import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyze = async (text: string) => {
  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: "",
    },
    contents: text,
  });
};
