"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import SidebarDropdown from "@/components/Sidebar/SidebarDropdown";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item, pageName, setPageName, setSidebarOpen }: any) => {
  const path = usePathname();
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    setPageName(updatedPageName);
  };

  const closeSideBar = () => {
    setSidebarOpen(false);
  };

  const listItem = {
    hidden: { x: -500 },
    show: { x: 0 },
  };
  useEffect(() => {
    setPageName(path.slice(1));
  }, [path]);

  return (
    <motion.li
      className={` ${
        pageName === item.label.toLowerCase()
          ? "bg-transparent text-primary dark:bg-dark-2 dark:text-white "
          : !item.disabled
            ? "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-white/70 dark:hover:bg-dark-2 dark:hover:text-white"
            : ""
      } flex h-full  min-h-[64px] w-full flex-col   justify-center border-b border-border px-5 py-4 dark:border-dark-3 lg:px-10  `}
      variants={listItem}
    >
      {/* Link for Desktop */}
      <Link
        href={!item.disabled ? item.route : "#"}
        onClick={handleClick}
        className={`
            item-center group  relative hidden h-full w-full items-center justify-start gap-3 rounded-[7px] font-medium duration-300 ease-in-out lg:flex`}
        style={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
      >
        {/* {item.icon} */}
        <i
          className={`duration-0 ease-linear ${pageName !== item.label.toLowerCase() && !item.image ? "opacity-[.28] dark:text-dark-6 dark:opacity-100 " : "opacity-100 "}`}
        >
          {item.image ? (
            <>
              <Image
                src={item.image ?? "/images/icon/icon.svg"}
                width={24}
                height={24}
                alt={item.label}
                className="flex dark:hidden"
              />
              <Image
                src={item.image_dark ?? "/images/icon/icon.svg"}
                width={24}
                height={24}
                alt={item.label}
                className="hidden dark:flex"
              />
            </>
          ) : (
            item.icon
          )}
        </i>
        <p className="min-w-[60%]">{item.label}</p>
        {item.disabled && (
          <sup className="mt-3 rounded-lg bg-prim3 p-2 text-xs text-white  dark:bg-[#373737]  dark:text-[#979797]">
            Soon
          </sup>
        )}
        {item.children && (
          <button
            className={`text-appBlack duration-200 ease-in   dark:text-white  ${pageName == item.label.toLowerCase() && "rotate-180"}`}
            onClick={handleClick}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </Link>
      {/* Link for Mobile */}
      <Link
        href={!item.disabled ? item.route : "#"}
        onClick={item.children ? handleClick : closeSideBar}
        className={`
            item-center group  relative flex h-full w-full items-center justify-start gap-3 rounded-[7px] font-medium duration-300 ease-in-out lg:hidden`}
        style={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
      >
        {/* {item.icon} */}
        <i
          className={`duration-0 ease-linear ${pageName !== item.label.toLowerCase() && !item.image ? "opacity-[.28] dark:text-dark-6 dark:opacity-100 " : "opacity-100 "}`}
        >
          {item.image ? (
            <>
              <Image
                src={item.image ?? "/images/icon/icon.svg"}
                width={24}
                height={24}
                alt={item.label}
                className="flex dark:hidden"
              />
              <Image
                src={item.image_dark ?? "/images/icon/icon.svg"}
                width={24}
                height={24}
                alt={item.label}
                className="hidden dark:flex"
              />
            </>
          ) : (
            item.icon
          )}
        </i>
        <p className="min-w-[60%]">{item.label}</p>
        {item.disabled && (
          <sup className="mt-3 rounded-lg bg-prim3 p-2 text-xs text-white  dark:bg-[#373737]  dark:text-[#979797]">
            Soon
          </sup>
        )}
        {item.children && (
          <button
            className={`text-appBlack duration-200 ease-in   dark:text-white  ${pageName == item.label.toLowerCase() && "rotate-180"}`}
            onClick={handleClick}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </Link>

      {item.children && (
        <div
          className={`translate  h-max transform overflow-hidden ${
            pageName !== item.label.toLowerCase() && "hidden"
          }`}
        >
          <SidebarDropdown
            setSidebarOpen={setSidebarOpen}
            show={pageName == item.label.toLowerCase()}
            item={item.children}
          />
        </div>
      )}
    </motion.li>
  );
};

export default SidebarItem;
