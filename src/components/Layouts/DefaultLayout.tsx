"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

import { createAppKit, ThemeMode } from "@reown/appkit/react";

import { projectId, wagmiAdapter } from "@/config";
import { mainnet } from "@reown/appkit/networks";
import { type Config, cookieToInitialState, WagmiProvider } from "wagmi";

import useColorMode from "@/hooks/useColorMode";
import { AppSession } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AppProvider } from "./AppProvider";

const queryClient = new QueryClient();

const metadata = {
  name: "SkyOps - Building a Global DeOS to Redefine AI Workload Orchestration.",
  description:
    "At SkyOps, we're transforming this landscape by creating the first decentralized GPU computing network. By connecting unused GPU power worldwide, we reduce AI computing costs by 70% while enabling GPU owners to earn from their idle resources.",

  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
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

  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  const { colorMode } = useColorMode();
  const path = usePathname();

  // Check if current path is CLI auth - hide sidebar and header
  const isCliAuthPage = path === "/auth/cli";

  if (!projectId) {
    throw new Error("Project ID is not defined");
  }
  createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet],
    metadata: metadata,
    themeMode: !Boolean(colorMode) as unknown as ThemeMode,
    projectId,
    features: {
      connectMethodsOrder: ["wallet"],
      email: false, // default to true
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
        <WagmiProvider
          config={wagmiAdapter.wagmiConfig as Config}
          initialState={initialState}
        >
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              {isCliAuthPage ? (
                // Simple layout for CLI auth - no sidebar or header
                <div className="flex h-screen w-full">
                  <main className="flex h-full w-full flex-col">
                    {children}
                  </main>
                </div>
              ) : (
                // Normal layout with sidebar and header
                <>
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
                </>
              )}
            </AppProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </SessionProvider>
    </>
  );
}
