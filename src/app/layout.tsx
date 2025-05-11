import "@/css/style.css";

import { getServerAuthSession } from "@/actions/auth";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Providers } from "@/redux/Provider";
import { Metadata } from "next";
import { Archivo } from "next/font/google";
import { headers } from "next/headers";
import React from "react";
import { Toaster } from "react-hot-toast";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skyops App | Scalable. Efficient. Unstoppable.",
  metadataBase: new URL("https://app.skyopslabs.ai"),

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
  // console.log(session, "session");
  return (
    <html lang="en">
      <body
        style={archivo.style}
        className={`bg-appGray dark:bg-dark`}
        suppressHydrationWarning={false}
      >
        <Providers>
          <DefaultLayout session={session} cookies={cookies}>
            {children}

            <Toaster toastOptions={{ position: "top-right" }} />
          </DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
