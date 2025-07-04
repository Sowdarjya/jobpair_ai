import { generateRoadmap } from "@/lib/generateRoadmap";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userInput } = await req.json();
  const { userId } = await auth();

  const generatedRoadmap = await generateRoadmap(userInput);

  await prisma.userHistory.create({
    data: {
      userId: userId!,
      tool: "ROADMAP_GENERATOR",
      input: userInput,
      output: generatedRoadmap,
    },
  });

  return new NextResponse(JSON.stringify(generatedRoadmap), { status: 200 });
}
