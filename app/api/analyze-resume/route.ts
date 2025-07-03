import imagekit from "@/lib/config";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const resume = formData.get("resume") as File;

  const loader = new WebPDFLoader(resume);
  const docs = await loader.load();
  console.log(docs[0].pageContent);

  const arrayBuffer = await resume.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const result = await imagekit.upload({
    file: base64,
    fileName: resume.name,
  });

  return new Response(result.url);
}
