import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const resolved = await params;
  const { id } = resolved;

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const historyItem = await prisma.userHistory.findFirst({
    where: { id, userId },
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
}
