"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Ubuntu, Sansita } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import path from "path";
import Loader from "../common/Loader";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import Logo from "../Logo";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    menuItems: [
      {
        image: "/images/icon/instances.svg",
        icon: (
          <svg
            style={{ width: "30px", height: "30px" }}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Instances.tsx"
          >
            <path
              d="M0 8C0 3.58172 3.58172 0 8 0H20C24.4183 0 28 3.58172 28 8V20C28 24.4183 24.4183 28 20 28H8C3.58172 28 0 24.4183 0 20V8Z"
              data-sentry-element="path"
              data-sentry-source-file="Instances.tsx"
            ></path>
            <path
              d="M6.08973 9.43296L13.9999 4.86603L21.9101 9.43296V18.5668L13.9999 23.1338L6.08973 18.5668V9.43296Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Instances.tsx"
            ></path>
            <path
              d="M11.2858 12.433L13.9998 10.866L16.7139 12.433V15.5669L13.9998 17.1339L11.2858 15.5669V12.433Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Instances.tsx"
            ></path>
          </svg>
        ),
        label: "Instances",
        route: "/instances",
        // disabled: true,
      },
      {
        icon: (
          <svg
            style={{ width: "30px", height: "30px" }}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Clusters.tsx"
          >
            <path
              d="M0 8C0 3.58172 3.58172 0 8 0H20C24.4183 0 28 3.58172 28 8V20C28 24.4183 24.4183 28 20 28H8C3.58172 28 0 24.4183 0 20V8Z"
              data-sentry-element="path"
              data-sentry-source-file="Clusters.tsx"
            ></path>
            <path
              d="M10.42 7.76602L14.0001 5.69903L17.5802 7.76602V11.9L14.0001 13.967L10.42 11.9V7.76602Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Clusters.tsx"
            ></path>
            <path
              d="M5.41987 16.099L9 14.032L12.5801 16.099V20.233L9 22.3L5.41987 20.233V16.099Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Clusters.tsx"
            ></path>
            <path
              d="M15.4199 16.099L19 14.032L22.5801 16.099V20.233L19 22.3L15.4199 20.233V16.099Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Clusters.tsx"
            ></path>
          </svg>
        ),
        label: "Clusters",
        route: "/clusters", // /calendar
        image: "/images/icon/clusters.svg",

        // disabled: true,
      },
      {
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Model.tsx"
          >
            <rect
              width="28"
              height="28"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              width="1440"
              height="1129"
              transform="translate(-28 -282)"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              x="-28"
              y="-282"
              width="236"
              height="1129"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              width="28"
              height="28"
              rx="8"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              x="4"
              y="4"
              width="20"
              height="20"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <path
              d="M14 5.25V13.5834L21.9167 18.5834L21.5 9.41668L14 5.25Z"
              fill="#1C1C1C"
              fillOpacity="0.1"
              data-sentry-element="path"
              data-sentry-source-file="Model.tsx"
            ></path>
            <path
              d="M13.875 4.93819C13.9524 4.89354 14.0477 4.89354 14.125 4.93819L21.7853 9.36086C21.8627 9.40551 21.9103 9.48805 21.9103 9.57736V18.4227C21.9103 18.512 21.8627 18.5945 21.7853 18.6392L14.125 23.0619C14.0477 23.1065 13.9524 23.1065 13.875 23.0619L6.21475 18.6392C6.1374 18.5945 6.08975 18.512 6.08975 18.4227V9.57736C6.08975 9.48805 6.1374 9.40551 6.21475 9.36086L13.875 4.93819Z"
              stroke="currentColor"
              strokeWidth="1.5"
              data-sentry-element="path"
              data-sentry-source-file="Model.tsx"
            ></path>
            <path
              d="M14.0001 9.41699V14.0003M14.0001 14.0003L9.41675 16.5003M14.0001 14.0003L18.5834 16.5003"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Model.tsx"
            ></path>
            <rect
              x="-3235.5"
              y="-437.5"
              width="7014"
              height="1398"
              stroke="#1C1C1C"
              strokeDasharray="14 14"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
          </svg>
        ),
        label: "Models",
        route: "#",
        image: "/images/icon/models.svg",

        children: [{ label: "Marketplace", route: "/models/marketplace" }],
      },
      {
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Model.tsx"
          >
            <rect
              width="28"
              height="28"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              width="1440"
              height="1129"
              transform="translate(-28 -282)"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              x="-28"
              y="-282"
              width="236"
              height="1129"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              width="28"
              height="28"
              rx="8"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <rect
              x="4"
              y="4"
              width="20"
              height="20"
              fill="transparent"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
            <path
              d="M14 5.25V13.5834L21.9167 18.5834L21.5 9.41668L14 5.25Z"
              fill="#1C1C1C"
              fillOpacity="0.1"
              data-sentry-element="path"
              data-sentry-source-file="Model.tsx"
            ></path>
            <path
              d="M13.875 4.93819C13.9524 4.89354 14.0477 4.89354 14.125 4.93819L21.7853 9.36086C21.8627 9.40551 21.9103 9.48805 21.9103 9.57736V18.4227C21.9103 18.512 21.8627 18.5945 21.7853 18.6392L14.125 23.0619C14.0477 23.1065 13.9524 23.1065 13.875 23.0619L6.21475 18.6392C6.1374 18.5945 6.08975 18.512 6.08975 18.4227V9.57736C6.08975 9.48805 6.1374 9.40551 6.21475 9.36086L13.875 4.93819Z"
              stroke="currentColor"
              strokeWidth="1.5"
              data-sentry-element="path"
              data-sentry-source-file="Model.tsx"
            ></path>
            <path
              d="M14.0001 9.41699V14.0003M14.0001 14.0003L9.41675 16.5003M14.0001 14.0003L18.5834 16.5003"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Model.tsx"
            ></path>
            <rect
              x="-3235.5"
              y="-437.5"
              width="7014"
              height="1398"
              stroke="#1C1C1C"
              strokeDasharray="14 14"
              data-sentry-element="rect"
              data-sentry-source-file="Model.tsx"
            ></rect>
          </svg>
        ),
        label: "AI Explorer",
        image: "/images/icon/icon.svg",
        image_dark: "/images/icon/icon-white.svg",

        route: "#",
        children: [
          { label: "Text", route: "/ai-explorer/text" },
          { label: "Image", route: "/ai-explorer/image", disabled: true },
          { label: "Audio", route: "/ai-explorer/audio", disabled: true },
        ],
      },
      {
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Inference.tsx"
          >
            <rect
              width="28"
              height="28"
              rx="8"
              data-sentry-element="rect"
              data-sentry-source-file="Inference.tsx"
            ></rect>
            <path
              d="M16.43 6.7002C19.7163 7.75653 22.1 10.8986 22.1 14.6104C22.1 15.6268 21.9213 16.6004 21.5943 17.5002M11.57 6.7002C8.28377 7.75653 5.90002 10.8986 5.90002 14.6104C5.90002 15.6268 6.07874 16.6004 6.40576 17.5002M19.0403 21.1002C17.657 22.2269 15.9053 22.9002 14 22.9002C12.0203 22.9002 10.2064 22.1733 8.79936 20.9661"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Inference.tsx"
            ></path>
            <circle
              cx="14"
              cy="6.7"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="20.3"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="7.7"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
          </svg>
        ),
        label: "Inference",
        route: "/inference",
        image: "/images/icon/inference.svg",

        // disabled: true,
      },
      {
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Inference.tsx"
          >
            <rect
              width="28"
              height="28"
              rx="8"
              data-sentry-element="rect"
              data-sentry-source-file="Inference.tsx"
            ></rect>
            <path
              d="M16.43 6.7002C19.7163 7.75653 22.1 10.8986 22.1 14.6104C22.1 15.6268 21.9213 16.6004 21.5943 17.5002M11.57 6.7002C8.28377 7.75653 5.90002 10.8986 5.90002 14.6104C5.90002 15.6268 6.07874 16.6004 6.40576 17.5002M19.0403 21.1002C17.657 22.2269 15.9053 22.9002 14 22.9002C12.0203 22.9002 10.2064 22.1733 8.79936 20.9661"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Inference.tsx"
            ></path>
            <circle
              cx="14"
              cy="6.7"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="20.3"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="7.7"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
          </svg>
        ),
        label: "Fine-Tune",
        route: "/fine-tune",
        image: "/images/icon/fine-tune.svg",

        disabled: true,
      },
      ,
      {
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Inference.tsx"
          >
            <rect
              width="28"
              height="28"
              rx="8"
              data-sentry-element="rect"
              data-sentry-source-file="Inference.tsx"
            ></rect>
            <path
              d="M16.43 6.7002C19.7163 7.75653 22.1 10.8986 22.1 14.6104C22.1 15.6268 21.9213 16.6004 21.5943 17.5002M11.57 6.7002C8.28377 7.75653 5.90002 10.8986 5.90002 14.6104C5.90002 15.6268 6.07874 16.6004 6.40576 17.5002M19.0403 21.1002C17.657 22.2269 15.9053 22.9002 14 22.9002C12.0203 22.9002 10.2064 22.1733 8.79936 20.9661"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Inference.tsx"
            ></path>
            <circle
              cx="14"
              cy="6.7"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="20.3"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="7.7"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
          </svg>
        ),
        label: "Top-up",
        image: "/images/icon/top-up.svg",

        route: "/top-up",
      },
      {
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Inference.tsx"
          >
            <rect
              width="28"
              height="28"
              rx="8"
              data-sentry-element="rect"
              data-sentry-source-file="Inference.tsx"
            ></rect>
            <path
              d="M16.43 6.7002C19.7163 7.75653 22.1 10.8986 22.1 14.6104C22.1 15.6268 21.9213 16.6004 21.5943 17.5002M11.57 6.7002C8.28377 7.75653 5.90002 10.8986 5.90002 14.6104C5.90002 15.6268 6.07874 16.6004 6.40576 17.5002M19.0403 21.1002C17.657 22.2269 15.9053 22.9002 14 22.9002C12.0203 22.9002 10.2064 22.1733 8.79936 20.9661"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Inference.tsx"
            ></path>
            <circle
              cx="14"
              cy="6.7"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="20.3"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="7.7"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
          </svg>
        ),
        label: "Rewards",
        image: "/images/icon/rewards.svg",

        route: "#",
        children: [
          {
            label: "Tasks",
            route: "/rewards/tasks",
          },
          { label: "Leaderboard", route: "/rewards/leaderboard" },
        ],
      },
      {
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="Inference.tsx"
          >
            <rect
              width="28"
              height="28"
              rx="8"
              data-sentry-element="rect"
              data-sentry-source-file="Inference.tsx"
            ></rect>
            <path
              d="M16.43 6.7002C19.7163 7.75653 22.1 10.8986 22.1 14.6104C22.1 15.6268 21.9213 16.6004 21.5943 17.5002M11.57 6.7002C8.28377 7.75653 5.90002 10.8986 5.90002 14.6104C5.90002 15.6268 6.07874 16.6004 6.40576 17.5002M19.0403 21.1002C17.657 22.2269 15.9053 22.9002 14 22.9002C12.0203 22.9002 10.2064 22.1733 8.79936 20.9661"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="path"
              data-sentry-source-file="Inference.tsx"
            ></path>
            <circle
              cx="14"
              cy="6.7"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="20.3"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
            <circle
              cx="7.7"
              cy="19.2996"
              r="1.95"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              data-sentry-element="circle"
              data-sentry-source-file="Inference.tsx"
            ></circle>
          </svg>
        ),
        label: "Settings",
        image: "/images/icon/settings.svg",

        route: "#",
        children: [
          { label: "Organization", route: "/settings/organization" },
          { label: "Account", route: "/settings/account" },
          {
            label: "Access Keys",
            route: "/settings/access-keys",
            disabled: true,
          },
        ],
      },
    ],
  },
];

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5,
      when: "beforeChildren", //use this instead of delay
      staggerChildren: 0.05,
    },
  },
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <aside
      className={`absolute   top-[128px] z-9999  h-[85vh] flex-col overflow-y-scroll border-r  border-stroke  bg-appGray duration-300 ease-linear  dark:border-stroke-dark dark:bg-dark lg:relative lg:top-0 lg:h-screen  ${
        sidebarOpen ? "w-full lg:w-[300px]" : "w-0 "
      } ${pathname == "/" ? "hidden" : "flex"}`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="hidden max-h-[80px] min-h-[80px] w-full items-center justify-between border-b border-border pl-10 dark:border-dark-3 lg:flex">
        <Link className="flex w-full items-center" href="/">
          <Logo />
        </Link>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      {/* <!-- Sidebar Menu --> */}
      <nav className="">
        <motion.ul
          variants={container}
          animate={sidebarOpen ? "show" : "hidden"}
          className="flex flex-col"
        >
          {menuGroups[0].menuItems.map((menuItem, menuIndex) => (
            <SidebarItem
              key={menuIndex}
              item={menuItem}
              pageName={pageName}
              setSidebarOpen={setSidebarOpen}
              setPageName={setPageName}
            />
          ))}
        </motion.ul>
      </nav>
      {/* Dark Mode Toggle */}
      <div className="mx-auto  my-12 flex lg:hidden">
        {sidebarOpen && <DarkModeSwitcher />}
      </div>
      {/* <!-- Sidebar Menu --> */}
    </aside>
  );
};

export default Sidebar;
