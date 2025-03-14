"use client";

import { useAppKit } from "@reown/appkit/react";
import { QueryClient } from "@tanstack/react-query";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Logo from "./Logo";
const queryClient = new QueryClient();

const images = [
  "/images/icon/trust.svg",
  "/images/icon/coinbase.svg",
  "/images/icon/metamask.svg",
  "/images/icon/connect.svg",
  "/images/icon/phantom.svg",
];

const Login: NextPage = () => {
  const { open } = useAppKit();
  const router = useRouter();
  const { isConnected } = useAccount();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [mouseMoving, setMouseMoving] = useState(false); // 1 for right, -1 for left

  // Motion values for parallax effect
  const mouseX = useMotionValue(mousePosition.x);
  const mouseY = useMotionValue(mousePosition.y);
  const main = useMotionValue(1);

  // Spring values for smooth motion
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const mainScale = useSpring(main, { stiffness: 50, damping: 20 });

  // Transform X and Y values for left cluster
  const leftClusterX = useTransform(
    springX,
    [0, typeof window !== "undefined" ? window?.innerWidth : 1000],
    [50, -50],
  );
  const leftClusterY = useTransform(
    springY,
    [0, typeof window !== "undefined" ? window?.innerHeight : 800],
    [50, -50],
  );
  const mainImage = useTransform(mainScale, [0, 1], [0.8, 1]);

  // Transform X and Y values for right cluster (inverse movement)
  const rightClusterX = useTransform(
    springX,
    [0, typeof window !== "undefined" ? window?.innerWidth : 1000],
    [-50, 50],
  );
  const rightClusterY = useTransform(
    springY,
    [0, typeof window !== "undefined" ? window?.innerHeight : 800],
    [-50, 50],
  );

  useEffect(() => {
    if (isConnected) {
      router.push("/instances");
    }
  }, [isConnected, router]);

  // Update mouse position for parallax effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseMoving(true);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
      clearTimeout(timeoutId);
    };
    // Clear previous timeout

    // Set a timeout to check if the mouse is static after 500ms
    timeoutId = setTimeout(() => {
      setMouseMoving(false);
    }, 500);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [mouseX, mouseY]);

  // Continuous back-and-forth movement effect
  useEffect(() => {
    const interval = setInterval(() => {
      const currentX = springX.get();
      if (currentX > window.innerWidth - 100) {
        setDirection(-1);
      } else if (currentX < 100) {
        setDirection(1);
      }
      // if (!mouseMoving) {
      springX.set(currentX + direction * 200);
      // }
    }, 100);

    return () => clearInterval(interval);
  }, [springX, direction]);

  const onConnect = () => {
    open();
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-start gap-10 overflow-clip bg-appGray dark:bg-dark lg:gap-[5vh]">
      <div
        id="header"
        className="flex w-full items-center justify-between px-5 pt-6 lg:px-8 lg:pt-8"
      >
        <Logo />
        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-[16px] bg-white p-2 dark:bg-dark-2">
            <div className="hidden items-center gap-3 lg:flex ">
              {images.map((item) => (
                <Image
                  className="duration-300 ease-in-out hover:scale-90"
                  key={item}
                  src={item}
                  width={56}
                  height={56}
                  alt={item}
                />
              ))}
            </div>
            <button
              onClick={onConnect}
              className="rounded-[12px] bg-prim2 p-4 font-medium text-white duration-100 active:scale-95 dark:bg-white dark:text-black lg:bg-appBlack lg:hover:bg-appBlack/70 lg:dark:bg-white/10 lg:dark:text-white"
            >
              Connect Wallet
            </button>
          </div>
          <div className="hidden rounded-[16px] bg-white p-2 dark:bg-dark-2 lg:flex">
            <button className="durationn-100 rounded-[12px] bg-prim2 p-4 font-medium text-white hover:bg-prim2/80 dark:bg-white dark:text-black">
              Use Referral Code
            </button>
          </div>
        </div>
      </div>
      <section className="flex flex-col items-center">
        <h1 className="text-[48px] font-medium text-appBlack dark:text-white lg:text-[64px]">
          Join Skyops
        </h1>
        <p className="max-w-[243px] text-center text-lg leading-6 text-appBlack/[.48] dark:text-white/[.48]">
          Revolutionize AI Scalability and Accessibility
        </p>
      </section>
      <div className="relative h-[767px] w-[859.37px]">
        {/* Left cluster with parallax effect */}
        <motion.div
          className="absolute left-[1%] top-[15%] h-[55%] w-[280.61px]"
          style={{
            x: leftClusterX,
            y: leftClusterY,
          }}
        >
          <Image
            src={"/images/cluster1.png"}
            fill
            className="object-contain dark:hidden"
            alt="left"
          />
          <Image
            src={"/images/cluster1-dark.png"}
            fill
            className="hidden object-contain dark:flex"
            alt="left"
          />
        </motion.div>

        {/* Right cluster with inverse parallax effect */}
        <motion.div
          className="absolute bottom-[12%] right-[1%] h-[55%] w-[280.61px]"
          style={{
            x: rightClusterX,
            y: rightClusterY,
          }}
        >
          <Image
            src={"/images/cluster2.png"}
            fill
            className="object-contain dark:hidden"
            alt="right"
          />
          <Image
            src={"/images/cluster2-dark.png"}
            fill
            className="hidden object-contain dark:flex"
            alt="right"
          />
        </motion.div>

        {/* Main image (static) */}
        <Image
          src={"/images/main-center.png"}
          fill
          className="z-50 rounded-[24px] object-contain"
          alt="banner"
        />
        {/* Bottom Images */}
        {/* Left switch with parallax effect */}
        <motion.div
          className="absolute bottom-[8%] left-[1%] h-[93.53px] w-[120.43px] "
          style={{
            y: leftClusterY,
          }}
        >
          <Image
            src={"/images/switch.svg"}
            fill
            className="object-contain dark:hidden"
            alt="left"
          />
          <Image
            src={"/images/switch-dark.svg"}
            fill
            className="hidden object-contain dark:flex"
            alt="left"
          />
        </motion.div>

        {/* Right text with inverse parallax effect */}
        <motion.div
          className="absolute bottom-[0%] right-[10%]  h-[43.26px] w-[240.86px]"
          style={{
            x: useMotionValue(rightClusterX.get() * -1),
            y: rightClusterY,
          }}
        >
          <Image
            src={"/images/text.svg"}
            fill
            className="object-contain dark:hidden"
            alt="right"
          />
          <Image
            src={"/images/text-dark.svg"}
            fill
            className="hidden object-contain dark:flex"
            alt="right"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
