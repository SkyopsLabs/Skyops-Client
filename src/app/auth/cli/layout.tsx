import "@/css/style.css";
import { Providers } from "@/redux/Provider";
import { AppProvider } from "@/components/Layouts/AppProvider";
import { Archivo } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";

const archivo = Archivo({ subsets: ["latin"] });

export default function CLIAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={archivo.style}
        className={`bg-appGray dark:bg-dark`}
        suppressHydrationWarning={false}
      >
        <Providers>
          <AppProvider>
            {children}
            <Toaster toastOptions={{ position: "top-right" }} />
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
