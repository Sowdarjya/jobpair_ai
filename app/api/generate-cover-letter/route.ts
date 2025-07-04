import { generateCoverLetter } from "@/lib/generateCoverLetter";
import imagekit from "@/lib/config";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json(
        { error: "Resume file is required." },
        { status: 400 }
      );
    }

    const loader = new WebPDFLoader(resume);
    const docs = await loader.load();
    const resumeText = docs[0].pageContent;

    const arrayBuffer = await resume.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const result = await imagekit.upload({
      file: base64,
      fileName: resume.name,
    });

    const jobTitle = formData.get("jobTitle") as string;
    const companyName = formData.get("companyName") as string;
    const jobDescription = formData.get("jobDescription") as string;
    const tone = formData.get("tone") as string;
    const length = formData.get("length") as string;

    const llmInput = JSON.stringify({
      resumeText,
      jobTitle,
      companyName,
      jobDescription,
      tone,
      length,
    });

    const coverLetter = await generateCoverLetter(llmInput);

    return NextResponse.json(
      { coverLetter, pdfUrl: result.url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate cover letter",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
