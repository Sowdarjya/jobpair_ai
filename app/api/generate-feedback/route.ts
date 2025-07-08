import { generateInterviewFeedback } from "@/lib/generateFeedback";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { transcript: answers, interviewId } = await req.json();
  const { userId } = await auth();
  try {
    const interviewDetails = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId: userId ?? "",
      },
    });

    const generatedFeedback = await generateInterviewFeedback(
      interviewDetails?.jobRole ?? "",
      interviewDetails?.jobDescription ?? "",
      interviewDetails?.level ?? "",
      interviewDetails?.type ?? "",
      (interviewDetails?.questions as string) ?? "",
      answers
    );

    const updatedInterview = await prisma.interview.update({
      where: {
        id: interviewId,
      },
      data: {
        feedback: JSON.stringify(generatedFeedback),
      },
    });

    await prisma.userHistory.create({
      data: {
        userId: userId ?? "",
        tool: "MOCK_INTERVIEW",
        input: answers,
        output: generatedFeedback,
      },
    });

    return new NextResponse(JSON.stringify(updatedInterview), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
