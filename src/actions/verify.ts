"use server";
import { ILeaderboard, IUser } from "@/types";
import clientPromise from "@/utils/mongo";

export const hasMessagedToday = async (userId: string): Promise<boolean> => {
  const res = await fetch(`/verify/check-telegram-message?userId=${userId}`);
  const data = await res.json();
  if (data.hasMessaged) {
    return true;
  } else {
    return false;
  }
};

const hey = "lskl";

export const addPoints = async (
  address: string,
  points: number,
  type: string,
): Promise<void> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }

  const pointsEntry = {
    date: new Date().toLocaleDateString("de-DE"),
    type: type,
    points: points,
  };

  await db.collection("users").updateOne(
    { wallet: address },
    {
      $inc: { points: points },
      // @ts-ignore
      $push: { pointsHistory: pointsEntry },
    },
  );
};

export const getUserDetails = async (wallet: string): Promise<any> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await db
    .collection("users")
    .findOne(
      { wallet },
      { projection: { _id: 0, created_at: 0, updated_at: 0 } },
    );
  if (user) {
    const { _id, ...rest } = user;
    return rest;
  } else {
    throw Error("No user found");
  }
};

export const getAllUsers = async (): Promise<ILeaderboard[]> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const users = (await db
    .collection("users")
    .find(
      {},
      { projection: { wallet: 1, points: 1, referee: 1, code: 1, _id: 0 } },
    )
    .toArray()) as unknown as ILeaderboard[];

  // Sort users by points in descending order to determine rank
  users.sort((a, b) => b.points - a.points);

  // Add rank and referee fields
  const usersWithRankAndReferee = await Promise.all(
    users
      .filter((item) => item.wallet && item.points >= 0)
      .map(async (user, index) => {
        const refereeWallet = user.referee
          ? await getUserByCode(user.referee)
          : "";
        return {
          wallet: user.wallet,
          points: user.points,
          rank: index + 1,
          referee: refereeWallet,
        };
      }),
  );

  return usersWithRankAndReferee;
};

const x = 5;
const y = 5;
const sum = x + y;

export const authenticateTwitter = async (
  address: string,
  id: number,
  username: string,
): Promise<string> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.x_id) {
    return "Twitter already connected";
  }

  // Check if Twitter ID or username already exists for another user
  const existingTwitterUser = await db.collection("users").findOne({
    $or: [{ x_id: id }, { x_username: username }],
    wallet: { $ne: address }, // Exclude the current user
  });

  if (existingTwitterUser) {
    return "This Twitter account is already linked to another wallet";
  }

  if (!user.x_id) {
    await db
      .collection("users")
      .updateOne(
        { wallet: address },
        { $set: { x_id: id, x_username: username } },
      );
    await addPoints(address, 10, "Connect Twitter");
    return "Twitter connected successfully";
  }

  return "Twitter connection status unknown";
};

export const authenticateDiscord = async (
  address: string,
  id: number,
  username: string,
): Promise<string> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.discord_id) {
    return "Discord already connected";
  }

  // Check if Discord ID or username already exists for another user
  const existingDiscordUser = await db.collection("users").findOne({
    $or: [{ discord_id: id }, { discord_username: username }],
    wallet: { $ne: address }, // Exclude the current user
  });

  if (existingDiscordUser) {
    return "This Discord account is already linked to another wallet";
  }

  if (!user.discord_id) {
    await db
      .collection("users")
      .updateOne(
        { wallet: address },
        { $set: { discord_id: id, discord_username: username } },
      );
    await addPoints(address, 10, "Connect Discord");
    return "Discord connected successfully";
  }

  return "Discord connection status unknown";
};

export const authenticateGmail = async (
  address: string,
  email: string,
): Promise<string> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.gmail) {
    return "Gmail already connected";
  }

  // Check if Gmail already exists for another user
  const existingGmailUser = await db.collection("users").findOne({
    gmail: email,
    wallet: { $ne: address }, // Exclude the current user
  });

  if (existingGmailUser) {
    return "This Gmail account is already linked to another wallet";
  }

  if (!user.gmail) {
    await db
      .collection("users")
      .updateOne({ wallet: address }, { $set: { gmail: email } });
    await addPoints(address, 10, "Connect Gmail");
    return "Gmail connected successfully";
  }

  return "Gmail connection status unknown";
};

export const authenticateTelegram = async (
  address: string,
  id: number,
  username: string,
): Promise<string> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.tg_id) {
    return "Telegram already connected";
  }

  // Check if Telegram ID or username already exists for another user
  const existingTelegramUser = await db.collection("users").findOne({
    $or: [{ tg_id: id }, { tg_username: username }],
    wallet: { $ne: address }, // Exclude the current user
  });

  if (existingTelegramUser) {
    return "This Telegram account is already linked to another wallet";
  }

  if (!user?.tg_id) {
    await db
      .collection("users")
      .updateOne(
        { wallet: address },
        { $set: { tg_id: id, tg_username: username } },
      );
    await addPoints(address, 10, "Connect Telegram");
    return "Telegram connected successfully";
  }

  return "Telegram connection status unknown";
};

export const getUserByCode = async (code: string): Promise<string> => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await db
    .collection("users")
    .findOne({ code }, { projection: { wallet: 1, _id: 0 } });
  if (user) {
    return user.wallet;
  } else {
    return "Invalid Referral Code";
  }
};
