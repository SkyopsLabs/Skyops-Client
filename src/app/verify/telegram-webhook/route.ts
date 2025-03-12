import { NextResponse } from "next/server";
import clientPromise from "@/utils/mongo";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.message)
      return NextResponse.json({ message: "No message received" });
    console.log(data);

    const userId = data.message.from.id;
    const username = data.message.from.username || "Unknown";
    const chatId = data.message.chat.id;
    const groupId = process.env.TG_GROUP_ID; // Replace with your actual group ID

    if (chatId != groupId)
      return NextResponse.json(
        { message: "Not from our group" },
        { status: 403 },
      );

    // Save user message activity
    const client = await clientPromise;
    const db = client.db("AIOps");
    await db
      .collection("users")
      .updateOne(
        { telegram_id: userId },
        { $set: { lastTelegramMessage: new Date() } },
        { upsert: true },
      );

    return NextResponse.json({ message: "Message tracked" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
