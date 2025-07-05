import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const historyItem = await prisma.userHistory.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      select: {
        id: true,
        tool: true,
        input: true,
        output: true,
        createdAt: true,
      },
    });

    if (!historyItem) {
      return NextResponse.json(
        { error: "History item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ history: historyItem }, { status: 200 });
  } catch (error) {
    console.error("[HISTORY_DETAIL_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch history detail" },
      { status: 500 }
    );
  }
}
