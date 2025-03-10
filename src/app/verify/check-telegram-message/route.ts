import clientPromise from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const client = await clientPromise;
    const db = client.db("AIOps");
  const user = await db.collection("telegramMessages").findOne({
    userId: parseInt(userId),
    lastMessage: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
      $lt: new Date(new Date().setHours(23, 59, 59, 999)) // End of today
    }
  });
  console.log(!!user);

  return NextResponse.json({ hasMessagedToday: !!user });
}
