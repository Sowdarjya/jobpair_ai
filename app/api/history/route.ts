import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const recentHistory = await prisma.userHistory.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        tool: true,
        input: true,
        output: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ history: recentHistory }, { status: 200 });
  } catch (error) {
    console.error("[HISTORY_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch history", details: error },
      { status: 500 }
    );
  }
}
