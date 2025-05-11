"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import { createAppKit, ThemeMode } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { type Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { solanaDevnet, solana, solanaTestnet } from "@reown/appkit/networks";
import { projectId } from "@/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./AppProvider";
import useColorMode from "@/hooks/useColorMode";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AppSession } from "@/types";

const queryClient = new QueryClient();

const metadata = {
  name: "SkyOps - Building a Global DeOS to Redefine AI Workload Orchestration.",
  description:
    "At SkyOps, we're transforming this landscape by creating the first decentralized GPU computing network. By connecting unused GPU power worldwide, we reduce AI computing costs by 70% while enabling GPU owners to earn from their idle resources.",

  url: "https://app.skyopslabs.ai",
  icons: ["https://app.skyopslabs.ai/opengraph-image.png"],
};

export default function DefaultLayout({
  children,
  cookies,
  session,
}: {
  children: React.ReactNode;
  cookies: string | null;
  session: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" && window.innerWidth > 1024 ? true : false,
  );

  const { colorMode } = useColorMode();
  const path = usePathname();

  const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [new PhantomWalletAdapter() as any, new SolflareWalletAdapter()],
  });

  if (!projectId) {
    throw new Error("Project ID is not defined");
  }
  createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: [solanaDevnet],
    metadata: metadata,
    themeMode: !Boolean(colorMode) as unknown as ThemeMode,
    projectId,
    features: {
      connectMethodsOrder: ["wallet"],
      email: !true, // default to true
      socials: [
        "google",
        // "x",
        // "github",
        // "discord",
        // "apple",
        // "facebook",
        // "farcaster",
      ],
      emailShowWallets: true, // default to true
      analytics: true,
    },
    allWallets: "SHOW", // default to SHOW
  });

  return (
    <>
      <SessionProvider session={session as unknown as AppSession}>
        {/* <WagmiProvider
          config={wagmiAdapter.wagmiConfig as Config}
          initialState={initialState}
        > */}
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            {/* <!-- ===== Page Wrapper Star ===== --> */}
            <div className="relative flex h-screen w-full overflow-hidden">
              {/* <!-- ===== Sidebar Star ===== --> */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Star ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Star ===== --> */}
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Star ===== --> */}
                <main
                  style={{ marginTop: path == "/" ? "0" : "initial" }}
                  className="mt-[64px] flex h-full flex-col lg:mt-0"
                >
                  {children}
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
          </AppProvider>
        </QueryClientProvider>
        {/* </WagmiProvider> */}
      </SessionProvider>
    </>
  );
}
