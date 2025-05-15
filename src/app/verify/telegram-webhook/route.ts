import { NextResponse } from "next/server";
import clientPromise from "@/utils/mongo";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.message)
      return NextResponse.json({ message: "No message received" });

    const userId = data.message.from.id;
    const username = data.message.from.username || "Unknown";
    const chatId = data.message.chat.id;
    const groupId = process.env.TG_GROUP_ID; // Replace with your actual group ID

    if (chatId != groupId)
      return NextResponse.json(
        { message: "Not from our group" },
        { status: 403 },
      );
    console.log(data.message.text);

    // Save user message activity
    const client = await clientPromise;
    const db = client.db("AIOps");

    const user = await db
      .collection("users")
      .findOne({ telegram_id: userId, wallet: { $exists: true } });
    if (user) {
      await db
        .collection("users")
        .updateOne(
          { telegram_id: userId },
          { $set: { lastTelegramMessage: Date.now() } },
        );
      return NextResponse.json({ message: "Message tracked" });
    } else {
      return NextResponse.json(
        { message: "No user found with this telegram_id" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
