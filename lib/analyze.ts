import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyze = async (text: string) => {
  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `You are an advanced AI Resume Analyzer Agent.

Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.

The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.



📤 INPUT: I will provide a plain text resume.

🎯 GOAL: Output a JSON report as per the schema below. The report should reflect:



overall_score (0–100)



overall_feedback (short message e.g., "Excellent", "Needs improvement")



summary_comment (1–2 sentence evaluation summary)



Section scores for:



Contact Info



Experience



Education



Skills



Each section should include:



score (as percentage)



Optional comment about that section



Tips for improvement (3–5 tips)



What’s Good (1–3 strengths)



Needs Improvement (1–3 weaknesses)



🧠 Output JSON Schema:

json

Copy

Edit

{

  "overall_score": 85,

  "overall_feedback": "Excellent!",

  "summary_comment": "Your resume is strong, but there are areas to refine.",

  "sections": {

    "contact_info": {

      "score": 95,

      "comment": "Perfectly structured and complete."

    },

    "experience": {

      "score": 88,

      "comment": "Strong bullet points and impact."

    },

    "education": {

      "score": 70,

      "comment": "Consider adding relevant coursework."

    },

    "skills": {

      "score": 60,

      "comment": "Expand on specific skill proficiencies."

    }

  },

  "tips_for_improvement": [

    "Add more numbers and metrics to your experience section to show impact.",

    "Integrate more industry-specific keywords relevant to your target roles.",

    "Start bullet points with strong action verbs to make your achievements stand out."

  ],

  "whats_good": [

    "Clean and professional formatting.",

    "Clear and concise contact information.",

    "Relevant work experience."

  ],

  "needs_improvement": [

    "Skills section lacks detail.",

    "Some experience bullet points could be stronger.",

    "Missing a professional summary/objective."

  ]

}

`,
    },
    contents: text,
  });

  const candidateText = res.candidates?.[0]?.content?.parts?.[0]?.text;
  const rawJson = candidateText?.replace("```json", "").replace("```", "");
  const parsedJson = JSON.parse(rawJson!);

  return parsedJson;
};
