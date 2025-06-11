"use client";

import SidebarItem from "@/components/Sidebar/SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import Logo from "../Logo";
import { fetchLeaderboard } from "@/redux/slices/leaderboardSlice";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";

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
              d="M10.001 13.333V17.5m5 0l-3.292-2.744c-.608-.506-.912-.76-1.25-.856a1.668 1.668 0 00-.915 0c-.339.097-.643.35-1.25.856L5.001 17.5m1.667-8.333V10m3.333-2.5V10m3.334-4.167V10m5-7.5H1.668m.833 0h15v6.833c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 01-1.093 1.093c-.534.272-1.235.272-2.635.272h-7c-1.4 0-2.1 0-2.635-.272a2.5 2.5 0 01-1.092-1.093C2.5 11.434 2.5 10.733 2.5 9.333V2.5z"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Analytics",
        route: "/analytics",
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
      ,
      // {
      //   icon: (
      //     <svg
      //       width="24"
      //       height="24"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M10 17.659V20a2 2 0 104 0v-2.341M12 2v1m-9 9H2m3.5-6.5l-.6-.6m13.6.6l.6-.6M22 12h-1m-3 0a6 6 0 11-12 0 6 6 0 0112 0z"
      //         stroke="currentColor"
      //         strokeOpacity="currentOpacity"
      //         strokeWidth="1.2"
      //         strokeLinecap="square"
      //       />
      //     </svg>
      //   ),
      //   label: "Inference",
      //   route: "/inference",

      //   // disabled: true,
      // },
      // {
      //   icon: (
      //     <svg
      //       width="24"
      //       height="24"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0h6M8 12H2"
      //         stroke="currentColor"
      //         strokeOpacity="currentOpacity"
      //         strokeWidth="1.2"
      //         strokeLinecap="square"
      //         strokeLinejoin="round"
      //       />
      //     </svg>
      //   ),
      //   label: "Fine-Tune",
      //   route: "/fine-tune",

      //   disabled: true,
      // },
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
        label: "Swap",

        route: "/swap",
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
      {
        icon: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              stroke="currentColor"
              strokeOpacity="currentOpacity"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        label: "Install Skyops Extension",
        route:
          "https://chromewebstore.google.com/detail/skyops/ifcnombjdiogkmhebkoameogpihkfkgi",
        external: true,
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
  const { address } = useAppKitAccount();
  const dispatch = useAppDispatch();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  useEffect(() => {
    if (address) {
      dispatch(fetchLeaderboard());
    }
  }, [address]);

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
      {/* Social Links - stick to bottom and center */}
      <div className="mt-auto flex w-full flex-col items-center justify-center pb-6 pt-8">
        <div className="flex justify-center space-x-4">
          <Link
            href="https://twitter.com/skyopslabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-300 text-gray-500 hover:bg-blue-100 hover:text-blue-500 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-blue-900 dark:hover:text-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="https://discord.gg/SkyopsLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-300 text-gray-500 hover:bg-indigo-100 hover:text-indigo-500 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.976-.608 1.41a18.565 18.565 0 0 0-5.487 0 12.041 12.041 0 0 0-.617-1.409.077.077 0 0 0-.079-.037A19.235 19.235 0 0 0 3.677 4.492c-.012 0-.024.006-.034.018-3.1 4.586-3.95 9.052-3.533 13.46.001.017.01.033.023.042a19.392 19.392 0 0 0 5.832 2.936.078.078 0 0 0 .084-.027c.463-.623.87-1.28 1.226-1.968.021-.04.001-.088-.044-.104a12.757 12.757 0 0 1-1.822-.867.077.077 0 0 1-.008-.128 10.543 10.543 0 0 0 .372-.291.074.074 0 0 1 .078-.01c3.928 1.782 8.18 1.782 12.062 0a.074.074 0 0 1 .078.009c.12.098.245.198.372.292.044.032.04.101-.008.128-.598.35-1.22.645-1.822.866a.077.077 0 0 0-.044.105c.36.687.772 1.344 1.225 1.967a.076.076 0 0 0 .084.028 19.32 19.32 0 0 0 5.835-2.936.075.075 0 0 0 .023-.042c.5-5.146-.838-9.578-3.549-13.459a.062.062 0 0 0-.034-.018ZM8.02 15.33c-1.183 0-2.157-1.083-2.157-2.419 0-1.335.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.335-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.083-2.157-2.419 0-1.335.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.335-.946 2.418-2.157 2.418Z" />
            </svg>
          </Link>
          <Link
            href="https://t.me/SkyopsLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-300 text-gray-500 hover:bg-blue-100 hover:text-blue-500 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-blue-900 dark:hover:text-blue-400"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM12.43 8.859c-1.167.485-3.5 1.49-6.998 3.014-.568.226-.866.447-.893.663-.046.366.412.51 1.034.705.085.027.173.054.263.084.613.199 1.437.432 1.865.441.389.008.823-.152 1.302-.48 3.268-2.207 4.955-3.322 5.061-3.346.075-.017.179-.039.249.024.07.062.063.18.056.212-.046.193-1.84 1.862-2.77 2.726-.29.269-.495.46-.537.504-.094.097-.19.19-.282.279-.57.548-.996.96.024 1.632.49.323.882.59 1.273.856.427.291.853.581 1.405.943.14.092.274.187.405.28.497.355.944.673 1.496.623.32-.03.652-.331.82-1.23.397-2.126 1.179-6.73 1.36-8.628a2.123 2.123 0 00-.02-.472.506.506 0 00-.172-.325c-.143-.117-.365-.142-.465-.14-.451.008-1.143.249-4.476 1.635z"
              />
            </svg>
          </Link>
          <Link
            href="https://skyopslabs.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-300 text-gray-500 hover:bg-green-100 hover:text-green-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-green-900 dark:hover:text-green-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="mx-auto my-6 flex lg:hidden">
        {sidebarOpen && <DarkModeSwitcher />}
      </div>
      {/* <!-- Sidebar Menu --> */}
    </aside>
  );
};

export default Sidebar;
