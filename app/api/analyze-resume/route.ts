import { analyze } from "@/lib/analyze";
import imagekit from "@/lib/config";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, has } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const TOOL_NAME = "RESUME_ANALYZER";
    const toolUsageCount = await prisma.userHistory.count({
      where: {
        userId,
        tool: TOOL_NAME,
      },
    });

    if (!has({ plan: "premium" }) && toolUsageCount >= 5) {
      return new Response("Upgrade required", { status: 403 });
    }

    const formData = await req.formData();
    const resume = formData.get("resume") as File;

    if (!resume) {
      return new Response("Resume file missing", { status: 400 });
    }

    const loader = new WebPDFLoader(resume);
    const docs = await loader.load();

    const arrayBuffer = await resume.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const uploadResult = await imagekit.upload({
      file: base64,
      fileName: resume.name,
    });

    const analysis = await analyze(docs[0].pageContent);

    await prisma.userHistory.create({
      data: {
        userId,
        tool: "RESUME_ANALYZER",
        input: { filename: resume.name },
        output: analysis,
      },
    });

    return new Response(JSON.stringify({ analysis, url: uploadResult.url }), {
      status: 200,
    });
  } catch (error) {
    console.error("[ANALYZE_ERROR]", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
