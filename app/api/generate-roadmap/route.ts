import { generateRoadmap } from "@/lib/generateRoadmap";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userInput } = await req.json();

  const generatedRoadmap = await generateRoadmap(userInput);

  console.log(generatedRoadmap);

  return new NextResponse(JSON.stringify(generatedRoadmap), { status: 200 });
}
