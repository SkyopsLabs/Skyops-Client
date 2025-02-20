// "use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";

import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "SkyOps",
  description: "Rebranding Enterprise solutions",

  openGraph: {
    title:
      "SkyOps - Building a Global DeOS to Redefine AI Workload Orchestration.",
    description:
      "At SkyOps, we're transforming this landscape by creating the first decentralized GPU computing network. By connecting unused GPU power worldwide, we reduce AI computing costs by 70% while enabling GPU owners to earn from their idle resources.",
    images: "https://app.skyopslabs.ai/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = headers();
  const cookies = headersObj.get("cookie");
  return (
    <html lang="en">
      <body suppressHydrationWarning={false}>
        <DefaultLayout cookies={cookies}>
          {children}

          <Toaster toastOptions={{ position: "top-right" }} />
        </DefaultLayout>
      </body>
    </html>
  );
}
