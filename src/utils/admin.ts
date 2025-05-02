"use server";
import * as fs from "fs";
import path from "path";

import { Ed25519Program, Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import * as anchor from "@coral-xyz/anchor";

// Use the current project directory to resolve the keypair file
const keypairPath = path.resolve(process.cwd(), "id.json");
const secretKeyString = fs.readFileSync(keypairPath, "utf8");

const key = JSON.parse(secretKeyString);
const secretKey = Uint8Array.from(key);
const owner = Keypair.fromSecretKey(secretKey);

export const getOwner = () => {
  return secretKeyString;
};
export const createSignedVerification = (userKey: string, points: number) => {
  const user = new PublicKey(userKey);
  const msgBuffer = Buffer.concat([
    user.toBuffer(),
    Buffer.from(new anchor.BN(points).toArrayLike(Buffer, "le", 8)),
  ]);

  // Sign the message with the owner's private key
  const sig = nacl.sign.detached(msgBuffer, owner.secretKey);

  // Create the Ed25519 instruction
  return Ed25519Program.createInstructionWithPublicKey({
    publicKey: owner.publicKey.toBytes(),
    message: msgBuffer,
    signature: sig,
  });
};
