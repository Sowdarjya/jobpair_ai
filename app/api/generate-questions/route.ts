import { generateQuestions } from "@/lib/generateQuestions";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { jobRole, jobDescription, level, type, userId } = await req.json();
  //   const { userId } = await auth();

  try {
    const questions = await generateQuestions(
      jobRole,
      jobDescription,
      level,
      type
    );

    await prisma.interview.create({
      data: {
        userId: userId!,
        jobRole: jobRole,
        jobDescription: jobDescription,
        level: level,
        type: type,
        questions: questions,
      },
    });

    return new NextResponse(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
