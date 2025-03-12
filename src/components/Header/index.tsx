"use client"; // Ensure this is a client component

import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import SkyopsBalance from "../SkyopsBalance";
import Logo from "../Logo";

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
      className={`${pathname == "/" ? "hidden" : "flex"} relative top-0 z-9999  flex h-[64px] w-full items-center justify-end border-b border-[#EBEBEC] bg-appGray  px-5  dark:border-stroke-dark dark:bg-dark lg:sticky lg:min-h-[80px] lg:px-10`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="mr-auto flex w-full items-center  lg:hidden">
        <Link className="flex w-full items-center gap-2" href="/">
          <Logo />
        </Link>
      </div>
      <div className="mr-auto hidden gap-1 lg:flex lg:items-center">
        <p className="text-[#01020C47] dark:text-dark-6 ">
          {sidebarOpen ? "Hide" : "Show"}
        </p>
        <button
          className="flex h-6  w-6"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <p className="m-auto flex h-[18px] w-[18px] items-center  justify-center rounded-[3px] border-[1.2px] border-border text-[8px] text-[#01020C47] active:scale-95 dark:border-dark-6  dark:text-dark-6">
            {sidebarOpen ? "H" : "S"}
          </p>
        </button>
        {/* <h5 className="text-heading-7 m-2  flex  font-bold capitalize text-dark dark:text-white">
            {pathname.slice(1)}
          </h5> */}
      </div>

      {/* Skyops Balance */}
      <div className="absolute left-0 top-full mt-[1px] flex h-[64px] w-full items-center justify-center border-b border-l border-border bg-white   px-5  py-4 dark:border-dark-3 dark:bg-dark lg:relative lg:top-0 lg:mt-0 lg:h-full lg:w-[163px] lg:border-b-0 lg:bg-transparent lg:px-6">
        <SkyopsBalance />
      </div>
      <div className="flex h-full items-center justify-normal gap-2 border-l  border-border dark:border-dark-3 2xsm:gap-4 lg:w-[350px] lg:justify-between xl:justify-normal">
        {/* Dark Mode Toggle */}
        <div className="ml-4  hidden w-[120px] lg:flex">
          <DarkModeSwitcher />
        </div>

        {/* User Area */}
        <DropdownUser
          address={address?.toString() || ""}
          onDisconnect={handleDisconnect}
        />
      </div>
      {/* Hamburger Toggle BTN */}
      <button
        aria-controls="sidebar"
        onClick={(e) => {
          e.stopPropagation();
          setSidebarOpen(!sidebarOpen);
        }}
        className="z-99999 flex h-16 min-w-12 items-center justify-end border-l border-border text-appBlack dark:border-dark-6   dark:text-white lg:hidden"
      >
        {!sidebarOpen ? (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7h18M3 12h18M3 17h18"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </button>
    </header>
  );
};

export default Header;
