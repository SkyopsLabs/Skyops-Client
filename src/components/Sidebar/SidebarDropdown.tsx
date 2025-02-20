"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const SidebarDropdown = ({ item, show }: any) => {
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
      className="my-2 flex flex-col gap-1.5 pl-9"
    >
      {item.map((item: any, index: number) => (
        <motion.li variants={listItem} key={index}>
          <Link
            href={!item.disabled ? item.route : "#"}
            className={`relative flex rounded-[7px] px-3.5 py-2 font-medium duration-300 ease-in-out ${
              pathname === item.route
                ? "bg-[#0000FE]/[.07] text-primary dark:bg-white/10 dark:text-white"
                : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
            style={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
          >
            {item.label}
            {item.disabled && (
              <sup className="absolute right-3.5 top-1/3 -translate-y-1/2 rounded-md bg-[#0000FE] px-1.5 py-px text-[10px] font-medium leading-[17px] text-white">
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
