"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Trophy icon for the completed quest
const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-500"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

// Confetti animation component
const Confetti = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {Array.from({ length: 50 }).map((_, index) => {
        const size = Math.random() * 10 + 5;
        const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${Math.random() * 3 + 2}s`;
        const delay = `${Math.random() * 2}s`;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: "2px",
              left,
              top: "-10px",
            }}
            animate={{
              y: ["0vh", "100vh"],
              rotate: [0, 360],
            }}
            transition={{
              duration: parseFloat(animationDuration),
              delay: parseFloat(delay),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

const LeaderBoard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show animation after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-16 flex flex-1 flex-col lg:mt-0">
      <div className="grid w-full grid-cols-1 items-center justify-end border-b border-border dark:border-dark-3 lg:flex lg:h-[64px] lg:px-10">
        <h4 className="mr-auto px-5 text-2xl font-medium text-appBlack dark:text-white lg:px-0 lg:text-[28px]">
          LeaderBoard
        </h4>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Confetti />

        <motion.div
          className="mx-5 flex w-full max-w-3xl flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center shadow-lg dark:from-gray-800/50 dark:to-gray-900/80"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isVisible ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="relative mb-6"
          >
            <div
              className="absolute inset-0 animate-ping rounded-full bg-amber-200/30 dark:bg-amber-800/30"
              style={{ animationDuration: "3s" }}
            ></div>
            <div className="relative">
              <TrophyIcon />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-4 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-3xl font-bold text-appBlack text-transparent dark:text-white lg:text-4xl"
          >
            The Quest is Complete!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-6 text-lg text-gray-700 dark:text-gray-300 lg:text-xl"
          >
            Thank you to everyone who participated in our reward quest campaign.
            All points have been tallied and the top 60 have been granted access
            to the extenstion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mb-6 rounded-lg border border-gray-200 bg-white/20 p-4 dark:border-gray-700 dark:bg-gray-800/20"
          >
            <p className="text-sm italic text-gray-600 dark:text-gray-400">
              &quot;Stay tuned for our next exciting campaign. Follow us on
              social media for updates!&quot;
            </p>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-2 flex flex-wrap justify-center gap-4"
          >
            <Link href="/models/marketplace">
              <button className="transform rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg">
                Explore Model Marketplace
              </button>
            </Link>
            <Link href="/instances">
              <button className="transform rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-white shadow-md transition-all hover:-translate-y-1 hover:from-amber-600 hover:to-amber-700 hover:shadow-lg">
                Deploy An Instance
              </button>
            </Link>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  );
};
export default LeaderBoard;
