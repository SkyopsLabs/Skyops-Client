// "use server";
// import { ILeaderboard, IUser } from "@/types";
// import clientPromise from "@/utils/mongo";

// export const hasMessagedToday = async (userId: string): Promise<boolean> => {
//   const res = await fetch(`/verify/check-telegram-message?userId=${userId}`);
//   const data = await res.json();
//   if (data.hasMessaged) {
//     return true;
//   } else {
//     return false;
//   }
// };

// const hey = "lskl";

// export const getChats = async (id: string): Promise<void> => {
//   const client = await clientPromise;
//   const db = client.db("AIOps");
//   if (!user) {
//     throw Error("Wallet not registered");
//   }

//   const pointsEntry = {
//     date: new Date().toLocaleDateString("de-DE"),
//     type: type,
//     points: points,
//   };

//   await db.collection("users").updateOne(
//     { wallet: address },
//     {
//       $inc: { points: points },
//       // @ts-ignore
//       $push: { pointsHistory: pointsEntry },
//     },
//   );
// };
