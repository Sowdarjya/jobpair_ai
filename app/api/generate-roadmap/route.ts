import { generateRoadmap } from "@/lib/generateRoadmap";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userInput } = await req.json();
  const { userId, has } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const TOOL_NAME = "ROADMAP_GENERATOR";
  const toolUsageCount = await prisma.userHistory.count({
    where: {
      userId,
      tool: TOOL_NAME,
    },
  });

  if (!has({ plan: "premium" }) && toolUsageCount >= 5) {
    return new Response("Upgrade required", { status: 403 });
  }

  try {
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
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
