"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const SidebarDropdown = ({ item, show, setSidebarOpen }: any) => {
  const pathname = usePathname();

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

  const listItem = {
    hidden: { y: 50 },
    show: { y: 0 },
  };

  return (
    <motion.ul
      variants={container}
      animate={show ? "show" : "hidden"}
      className=" my-5 flex flex-col gap-1.5 pl-3 "
    >
      {item.map((item: any, index: number) => (
        <motion.li className="mb-1" variants={listItem} key={index}>
          <Link
            href={!item.disabled ? item.route : "#"}
            onClick={() => setSidebarOpen(false)}
            className={` relative flex items-center gap-3 rounded-[7px] px-3.5 py-2 font-medium duration-300 ease-in-out lg:hidden ${
              pathname === item.route
                ? "bg-[#0000FE]/[.07] text-primary dark:bg-white/10 dark:text-white"
                : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
            style={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
          >
            <div className="h-[6px] w-[6px] rounded-full bg-[#E0E0E0]" />
            <div className="absolute bottom-1/2 left-0 h-[60px] w-[15px]  rounded-bl-xl border-b border-l border-[#E0E0E0]" />

            {item.label}
            {item.disabled && (
              <sup className="bg-prim3 absolute right-3.5 top-1/3 -translate-y-1/3 rounded-md px-1.5 py-px text-[10px] font-medium leading-[17px] text-white">
                Soon
              </sup>
            )}
          </Link>
          <Link
            href={!item.disabled ? item.route : "#"}
            className={` relative hidden items-center gap-3 rounded-[7px] px-3.5 py-2 font-medium duration-300 ease-in-out lg:flex ${
              pathname === item.route
                ? "bg-[#0000FE]/[.07] text-primary dark:bg-white/10 dark:text-white"
                : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
            style={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
          >
            <div className="h-[6px] w-[6px] rounded-full bg-[#E0E0E0]" />
            <div className="absolute bottom-1/2 left-0 h-[60px] w-[15px]  rounded-bl-xl border-b border-l border-[#E0E0E0]" />

            {item.label}
            {item.disabled && (
              <sup className="bg-prim3 absolute right-3.5 top-1/3 -translate-y-1/3 rounded-md px-1.5 py-px text-[10px] font-medium leading-[17px] text-white">
                Soon
              </sup>
            )}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default SidebarDropdown;
