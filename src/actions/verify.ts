"use server";

import clientPromise from "@/utils/mongo";

export const hasMessagedToday = async (userId: string) => {
  const res = await fetch(`/verify/check-telegram-message?userId=${userId}`);
  const data = await res.json();

  if (data.hasMessaged) {
    return true;
  } else {
    return false;
  }
};

export const addPoints = async (address: string, points: number) => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }

  if (user) {
    db.collection("users").updateOne(
      { wallet: address },
      { $set: { points: user.points + points } },
    );
  }
};
export const getUserDetails = async (wallet: string) => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await db
    .collection("users")
    .findOne({ wallet }, { projection: { _id: 0 } });
  if (user) {
    return user;
  } else {
    throw Error("No user found");
  }
};

export const authenticateTwitter = async (
  address: string,
  id: number,
  username: string,
) => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.x_id) {
    return;
  }
  if (!user.x_id) {
    db.collection("users").updateOne(
      { wallet: address },
      { $set: { x_id: id, x_username: username } },
    );

    await addPoints(address, 10);
  }
};

export const authenticateDiscord = async (
  address: string,
  id: number,
  username: string,
) => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.discord_id) {
    return;
  }
  if (!user.discord_id) {
    db.collection("users").updateOne(
      { wallet: address },
      { $set: { discord_id: id, discord_username: username } },
    );
    await addPoints(address, 10);
  }
};

export const authenticateGmail = async (address: string, email: string) => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.gmail) {
    return;
  }
  if (!user.gmail) {
    db.collection("users").updateOne(
      { wallet: address },
      { $set: { gmail: email } },
    );
    await addPoints(address, 10);
  }
};
export const authenticateTelegram = async (
  address: string,
  id: number,
  username: string,
) => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.telegram_id) {
    return;
  }
  if (!user?.telegram_id) {
    db.collection("users").updateOne(
      { wallet: address },
      { $set: { telegram_id: id, telegram_username: username } },
    );
    await addPoints(address, 10);
  }
};

export const verifyDailyMessages = async (
  address: string,
  id: number,
  username: string,
) => {
  const client = await clientPromise;
  const db = client.db("AIOps");
  const user = await getUserDetails(address);
  if (!user) {
    throw Error("Wallet not registered");
  }
  if (user?.telegram_id) {
    return;
  }
  if (!user?.telegram_id) {
    db.collection("users").updateOne(
      { wallet: address },
      { $set: { telegram_id: id, telegram_username: username } },
    );
    await addPoints(address, 10);
  }
};
