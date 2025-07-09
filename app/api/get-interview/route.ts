import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const { userId } = await auth();

  if (!id || !userId) {
    return new NextResponse("Missing id or userId", { status: 400 });
  }

  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id,
        userId,
      },
    });

    return new NextResponse(JSON.stringify(interview), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
