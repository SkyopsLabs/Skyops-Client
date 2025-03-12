// "use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";

import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Archivo } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { getServerAuthSession } from "@/actions/auth";
import { AppSession } from "@/types";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skyops App | Scalable. Efficient. Unstoppable.",
  description:
    "Skyops is a decentralized AI computing platform that leverages unused GPU power worldwide to significantly reduce AI development costs while providing GPU owners with a way to earn from their idle hardware.",

  openGraph: {
    title: "Skyops App | Scalable. Efficient. Unstoppable.",
    description:
      "Skyops is a decentralized AI computing platform that leverages unused GPU power worldwide to significantly reduce AI development costs while providing GPU owners with a way to earn from their idle hardware.",
    images: "https://app.skyopslabs.ai/opengraph-image.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = headers();
  const cookies = headersObj.get("cookie");
  const session = (await getServerAuthSession()) as unknown as string;
  console.log(session, "session");
  return (
    <html lang="en">
      <body
        style={archivo.style}
        className={`bg-appGray dark:bg-dark`}
        suppressHydrationWarning={false}
      >
        <DefaultLayout session={session} cookies={cookies}>
          {children}

          <Toaster toastOptions={{ position: "top-right" }} />
        </DefaultLayout>
      </body>
    </html>
  );
}
