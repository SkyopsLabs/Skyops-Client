"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/components/Layouts/AppProvider";
import ConnectWallet from "@/components/ConnectWallet";

export default function CLIAuthPage() {
  const { isConnected, address } = useAppKitAccount();
  const { user } = useApp();
  const searchParams = useSearchParams();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get session ID and callback URL from URL params for CLI identification
    const session = searchParams?.get("session");
    const callback = searchParams?.get("callback");

    if (session) {
      setSessionId(session);
    }
    if (callback) {
      setCallbackUrl(callback);
    }
  }, [searchParams]);

  useEffect(() => {
    const redirectToCLI = (token: string) => {
      try {
        const url = new URL(callbackUrl!);
        url.searchParams.set("token", token);
        url.searchParams.set("address", address || "");
        url.searchParams.set("wallet", user?.wallet || "");
        window.location.href = url.toString();
      } catch (error) {
        console.error("Failed to redirect to CLI:", error);
      }
    };

    // When user is authenticated, get the token from localStorage
    if (isConnected && address && user) {
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);

        // If we have a callback URL, redirect back to CLI with token
        if (callbackUrl) {
          redirectToCLI(token);
        }
      }
    }
  }, [isConnected, address, user, callbackUrl]);

  const copyToClipboard = async () => {
    if (authToken) {
      await navigator.clipboard.writeText(authToken);
    }
  };

  // If user is not connected, show the login component
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-appGray dark:bg-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <svg
                className="h-8 w-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              SkyOps CLI Authentication
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Connect your wallet to authenticate with the SkyOps CLI tool
            </p>
            <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
              <p>The SkyOps CLI needs to authenticate with your wallet to:</p>
              <ul className="mx-auto mt-2 max-w-md list-inside list-disc space-y-1 text-left">
                <li>Register your GPU node with the network</li>
                <li>Send periodic heartbeat updates</li>
                <li>Receive job assignments and payments</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
    );
  }

  // If connected but no token yet, show loading
  if (!authToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-appGray dark:bg-dark">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-900 dark:text-white">Authenticating...</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Getting your authentication token...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If we have a callback URL, show redirect status
  if (callbackUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-appGray dark:bg-dark">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-green-600"></div>
            <p className="text-gray-900 dark:text-white">
              Redirecting back to CLI...
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              You will be redirected automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show success state with token for manual copy
  return (
    <div className="flex min-h-screen items-center justify-center bg-appGray dark:bg-dark">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Authentication Successful!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Copy the token below to use with your CLI tool.
            </p>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Authentication Token:
            </label>
            <div className="rounded-lg border bg-gray-100 p-4 dark:bg-gray-700">
              <code className="break-all text-sm text-gray-800 dark:text-gray-200">
                {authToken}
              </code>
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Copy to Clipboard
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Connected Address:</strong> {address}
              </p>
              {user && (
                <p>
                  <strong>Wallet:</strong> {user.wallet}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Use this token with the command:{" "}
              <code className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-800">
                skyops register --token [TOKEN]
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
