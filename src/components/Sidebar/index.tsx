"use client";

import SidebarItem from "@/components/Sidebar/SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import Logo from "../Logo";

interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (arg: boolean) => void;
}

const menuGroups = [
  {
    menuItems: [
      {
        icon: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5 7.209L12 12m0 0L3.5 7.209M12 12v9.639m9-5.521V7.882c0-.347 0-.521-.05-.676a1.018 1.018 0 00-.215-.37c-.109-.12-.258-.204-.558-.373l-7.4-4.171c-.284-.16-.425-.24-.575-.271a.987.987 0 00-.403 0c-.15.031-.292.111-.576.27l-7.4 4.172c-.3.169-.45.253-.558.373-.097.107-.17.233-.215.37C3 7.36 3 7.535 3 7.882v8.236c0 .348 0 .521.05.676.045.137.118.263.215.37.109.12.258.204.558.373l7.4 4.171c.284.16.425.24.575.271.133.028.27.028.403 0 .15-.031.292-.111.576-.27l7.4-4.172c.3-.169.45-.253.558-.373.097-.107.17-.233.215-.37.05-.155.05-.329.05-.676z"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Instances",
        route: "/instances",
        // disabled: true,
      },
      {
        icon: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 9.333H4m16 5.334H4m16-6.4v7.466c0 1.494 0 2.24-.29 2.811-.256.502-.664.91-1.166 1.165-.57.291-1.317.291-2.81.291H8.266c-1.494 0-2.24 0-2.811-.29a2.667 2.667 0 01-1.165-1.166C4 17.974 4 17.227 4 15.734V8.266c0-1.494 0-2.24.29-2.811.256-.502.664-.91 1.166-1.165C6.026 4 6.773 4 8.266 4h7.467c1.494 0 2.24 0 2.811.29.502.256.91.664 1.165 1.166.291.57.291 1.317.291 2.81z"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Clusters",
        route: "/clusters", // /calendar

        // disabled: true,
      },
      {
        icon: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 2v3m6-3v3M9 19v3m6-3v3m4-13h3m-3 5h3M2 9h3m-3 5h3m4.8 5h4.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C19 16.72 19 15.88 19 14.2V9.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C16.72 5 15.88 5 14.2 5H9.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C5 7.28 5 8.12 5 9.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C7.28 19 8.12 19 9.8 19z"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Models",
        route: "#",

        children: [{ label: "Marketplace", route: "/models/marketplace" }],
      },
      {
        label: "AI Explorer",
        image: "/images/icon/icon.svg",
        image_dark: "/images/icon/icon-glossy.svg",

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
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 17.659V20a2 2 0 104 0v-2.341M12 2v1m-9 9H2m3.5-6.5l-.6-.6m13.6.6l.6-.6M22 12h-1m-3 0a6 6 0 11-12 0 6 6 0 0112 0z"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
        ),
        label: "Inference",
        route: "/inference",

        // disabled: true,
      },
      {
        icon: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0h6M8 12H2"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Fine-Tune",
        route: "/fine-tune",

        disabled: true,
      },
      ,
      {
        icon: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.544 14.544a6.301 6.301 0 10-7.088-7.088M15.6 13.7a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Top-up",

        route: "/top-up",
      },
      {
        icon: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 15.09V22l4.703-1.881c.11-.044.165-.066.221-.075a.5.5 0 01.152 0c.056.009.111.03.221.075L17 22v-6.91m2.5-5.59a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Rewards",

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
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8h12m0 0a3 3 0 106 0 3 3 0 00-6 0zm-6 8h12M9 16a3 3 0 11-6 0 3 3 0 016 0z"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Settings",

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
      className={`absolute   top-[128px] z-9999  h-[85vh] flex-col overflow-y-scroll border-r border-stroke  bg-appGray  duration-300 ease-linear dark:border-stroke-dark  dark:bg-dark lg:relative lg:top-0 lg:h-screen lg:overflow-y-clip  ${
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
