"use client";
import React from "react";
import Link from "next/link";
import SidebarDropdown from "@/components/Sidebar/SidebarDropdown";
import { motion } from "framer-motion";
import Image from "next/image";

const SidebarItem = ({ item, pageName, setPageName, setSidebarOpen }: any) => {
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

  return (
    <motion.li
      className={` ${
        pageName === item.label.toLowerCase()
          ? "bg-transparent text-primary dark:bg-white/10 dark:text-white"
          : !item.disabled
            ? "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
            : ""
      } border-border flex  h-full min-h-[64px] w-full   flex-col justify-center border-b px-5 py-4 dark:border-dark-3 lg:px-10  `}
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
        <Image
          src={item.image ?? "/images/icon/icon.svg"}
          width={24}
          height={24}
          alt={item.label}
        />
        <p className="min-w-[60%]">{item.label}</p>
        {item.disabled && (
          <sup className="bg-prim3 mt-3 rounded-lg p-2  text-xs  text-white">
            Soon
          </sup>
        )}
        {item.children && (
          <button onClick={handleClick}>
            <Image
              alt="down"
              src={"/images/icon/chevron-down.svg"}
              className={`  duration-200 ease-in ${pageName == item.label.toLowerCase() && "rotate-180"}`}
              width="24"
              height="24"
            />
          </button>
        )}
      </Link>
      {/* Link for Mobile */}

      <Link
        href={!item.disabled ? item.route : "#"}
        onClick={item.children ? handleClick : closeSideBar}
        className={`
            item-center group relative flex h-full w-full items-center justify-start gap-3 rounded-[7px] font-medium duration-300 ease-in-out lg:hidden`}
        style={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
      >
        {/* {item.icon} */}
        <Image
          src={item.image ?? "/images/icon/icon.svg"}
          width={24}
          height={24}
          alt={item.label}
        />
        <p className="min-w-[60%]">{item.label}</p>
        {item.disabled && (
          <sup className="bg-prim3 mt-3 rounded-lg p-2  text-xs  text-white">
            Soon
          </sup>
        )}
        {item.children && (
          <button onClick={handleClick}>
            <Image
              alt="down"
              src={"/images/icon/chevron-down.svg"}
              className={`  duration-200 ease-in ${pageName == item.label.toLowerCase() && "rotate-180"}`}
              width="24"
              height="24"
            />
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
