"use client"; // Ensure this is a client component

import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  // Directly call useRouter and usePathname without condition
  const router = useRouter();
  const pathname = usePathname(); // returns the current path
  const [curPath, setCurPath] = useState("");

  const { isConnected, chainId, address } = useAccount();

  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  const formatPath = (path: string) => {
    if (path === "ai-explorer/text") {
      return "AI Explorer/Text";
    } else {
      return path
        .split("/")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join("/");
    }
  };

  useEffect(() => {
    if (!pathname) return;
    setCurPath(formatPath(pathname.slice(1)));
  }, [pathname]);

  return (
    <header
      // suppressHydrationWarning={true}
      className={`${pathname == "/" ? "hidden" : "flex"} sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark`}
    >
      <div className="flex flex-grow items-center justify-between px-4 py-3 shadow-2 md:px-5 2xl:px-8">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
          >
            {/* Your Hamburger Icon Logic */}
          </button>

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden xl:block">
          <div className="flex items-center ">
            <button
              className="active:scale-95"
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <Image
                className="mx-1 my-2 dark:hidden"
                src={"/images/header_logo.png"}
                alt="Logo"
                width={20}
                height={15}
              />
              <Image
                className="mx-1 my-2 hidden dark:flex"
                src={"https://i.ibb.co/BHKWH3Vj/header-logo-dark-version.webp"}
                alt="Logo"
                width={20}
                height={15}
              />
            </button>
            <h5 className="text-heading-7 m-2  flex  font-bold capitalize text-dark dark:text-white">
              {pathname.slice(1)}
            </h5>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          {/* Dark Mode Toggle */}
          <DarkModeSwitcher />

          {/* User Area */}
          <DropdownUser
            address={address?.toString() || ""}
            onDisconnect={handleDisconnect}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
