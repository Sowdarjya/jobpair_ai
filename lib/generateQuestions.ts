import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateQuestions = async (
  jobRole: string,
  jobDescription: string,
  level: string,
  type: string
) => {
  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `
                You are an expert in the field of job interviews and have a deep understanding of the process.
                Generate minimum number of questions for the given level and type of interview for the given job role based on the job description provided.
                Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you <3
            `,
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Job Role: ${jobRole}\nJob Description: ${jobDescription}\nLevel: ${level}\nType: ${type}`,
          },
        ],
      },
    ],
  });

  const candidateText = res?.candidates?.[0]?.content?.parts?.[0]?.text;
  const rawJson = candidateText?.replace("```json", "").replace("```", "");
  const parsedJson = JSON.parse(rawJson!);

  return parsedJson;
};
