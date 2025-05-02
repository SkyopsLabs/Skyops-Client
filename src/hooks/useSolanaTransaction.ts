"use client";
import { useCallback, useState } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  Keypair,
} from "@solana/web3.js";
import type {
  AnyTransaction,
  Provider,
} from "@reown/appkit-adapter-solana/react";
import { getOwner } from "@/utils/admin";

/**
 * Custom hook for handling Solana transactions using Reown AppKit
 * @returns Transaction-related state and functions
 */
export const useSolanaTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  // Get AppKit hooks for connection, account and provider
  const { connection } = useAppKitConnection();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const key = [
    183, 221, 195, 188, 236, 42, 90, 192, 71, 127, 54, 132, 199, 15, 185, 36,
    93, 200, 157, 103, 239, 121, 57, 156, 18, 45, 148, 233, 150, 102, 59, 243,
    1, 192, 194, 87, 25, 119, 105, 220, 185, 189, 117, 227, 109, 93, 69, 199,
    198, 189, 53, 175, 193, 253, 160, 163, 68, 109, 75, 46, 250, 140, 91, 94,
  ];
  const secretKey = Uint8Array.from(key);
  const owner = Keypair.fromSecretKey(secretKey);

  /**
   * Send a transaction to a recipient with a specified amount
   * @param recipientAddress - Address of the recipient
   * @param amountLamports - Amount to send in lamports
   * @returns Transaction signature if successful
   */
  const sendTransaction = useCallback(
    async (recipientAddress: string, amountLamports: number) => {
      if (!isConnected || !connection || !walletProvider || !address) {
        setError("Wallet not connected");
        return null;
      }

      setIsLoading(true);
      setError(null);
      setSignature(null);

      try {
        // Get the latest blockhash for the transaction
        const latestBlockhash = await connection.getLatestBlockhash();

        // Create the wallet PublicKey object
        const wallet = new PublicKey(address);

        // Create the recipient PublicKey object
        const recipient = new PublicKey(recipientAddress);

        // Create a new transaction
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: wallet,
            toPubkey: recipient,
            lamports: amountLamports,
          }),
        );

        tx.feePayer = wallet;
        tx.recentBlockhash = latestBlockhash.blockhash;

        // Send the tx
        const txSignature = await walletProvider.sendTransaction(
          tx as unknown as AnyTransaction,
          connection,
        );

        // Set the signature for confirmation
        setSignature(txSignature);

        return txSignature;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Transaction failed:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [connection, walletProvider, isConnected, address],
  );

  /**
   * Send a custom transaction with provided instructions
   * @param instructions - Array of transaction instructions
   * @returns Transaction signature if successful
   */
  const sendCustomTransaction = useCallback(
    async (instructions: TransactionInstruction[]) => {
      if (!isConnected || !connection || !walletProvider || !address) {
        setError("Wallet not connected");
        return null;
      }

      setIsLoading(true);
      setError(null);
      setSignature(null);

      try {
        // Get the latest blockhash for the transaction
        const secretKeyString = await getOwner();
        const key = JSON.parse(secretKeyString);
        const secretKey = Uint8Array.from(key);
        const owner = Keypair.fromSecretKey(secretKey);
        const latestBlockhash = await connection.getLatestBlockhash();

        // Create the wallet PublicKey object
        const wallet = new PublicKey(address);

        // Create a new transaction with the provided instructions
        const tx = new Transaction();
        tx.feePayer = owner.publicKey;
        tx.recentBlockhash = latestBlockhash.blockhash;

        // Add all instructions to the tx
        tx.add(...instructions);

        // Convert Uint8Array to Buffer for addSignature
        tx.partialSign(owner);

        // Send the tx
        const txSignature = await walletProvider.sendTransaction(
          tx as unknown as AnyTransaction,
          connection,
        );

        // Set the signature for confirmation
        setSignature(txSignature);

        return txSignature;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        // console.error("Transaction failed:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [connection, walletProvider, isConnected, address],
  );

  /**
   * Check status of a transaction
   * @param txSignature - Transaction signature to check
   * @returns Promise with confirmation status
   */
  const checkTransactionStatus = useCallback(
    async (txSignature: string) => {
      if (!connection) {
        setError("Connection not available");
        return null;
      }

      try {
        const confirmation = await connection.confirmTransaction(txSignature);
        return confirmation;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Failed to check transaction status:", err);
        return null;
      }
    },
    [connection],
  );

  return {
    sendTransaction,
    sendCustomTransaction,
    checkTransactionStatus,
    isLoading,
    error,
    signature,
    isConnected,
  };
};
