"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import { type Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { sepolia } from "@reown/appkit/networks";
import { projectId, wagmiAdapter } from "@/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./AppProvider";

const queryClient = new QueryClient();
if (!projectId) {
  throw new Error("Project ID is not defined");
}

const metadata = {
  name: "SkyOps - Building a Global DeOS to Redefine AI Workload Orchestration.",
  description:
    "At SkyOps, we're transforming this landscape by creating the first decentralized GPU computing network. By connecting unused GPU power worldwide, we reduce AI computing costs by 70% while enabling GPU owners to earn from their idle resources.",

  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

createAppKit({
  adapters: [wagmiAdapter],
  networks: [sepolia],
  metadata: metadata,
  projectId,
  features: {
    connectMethodsOrder: ["wallet"],
    email: true, // default to true
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

export default function DefaultLayout({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <>
      <WagmiProvider
        config={wagmiAdapter.wagmiConfig as Config}
        initialState={initialState}
      >
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
                <main className="flex h-full flex-col">{children}</main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
          </AppProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
