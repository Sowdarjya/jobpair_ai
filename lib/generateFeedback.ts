import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateInterviewFeedback = async (
  jobRole: string,
  jobDescription: string,
  level: string,
  type: string,
  questions: string,
  answers: string
) => {
  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `You are a professional interviewer analyzing a mock interview for a ${jobRole} position.
            The job description is: ${jobDescription}
            The level of experience is: ${level}
            The type of interview is: ${type}

            Your job is to give feedback to the interviewer based on the provided questions and answers.

            score the candidate based on the quality of their answers and their ability to answer the questions on a scale of 0-100 in the following categories. Don't add other categories.
            - Overall_Score
            - Communication
            - Technical_Knowledge
            - Problem_Solving
            - Leadership
            - Collaboration
            - Creativity
            - Adaptability

            Don't be too rough on the candidate, just give them a score based on the quality of their answers.
            and give the output as a JSON object.
            `,
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Questions: ${questions}\nAnswers: ${answers}`,
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
