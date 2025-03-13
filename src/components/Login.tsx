"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { motion, useMotionValue, useTransform } from "framer-motion";
import MetamaskSvg from "@/components/MetamaskSvg";
import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";
import Loader from "./common/Loader";
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

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform X and Y values for left cluster
  const leftClusterX = useTransform(
    mouseX,
    [0, window?.innerWidth || 1000],
    [30, -30],
  );
  const leftClusterY = useTransform(
    mouseY,
    [0, window?.innerHeight || 800],
    [15, -15],
  );

  // Transform X and Y values for right cluster (inverse movement)
  const rightClusterX = useTransform(
    mouseX,
    [0, window?.innerWidth || 1000],
    [-50, 50],
  );
  const rightClusterY = useTransform(
    mouseY,
    [0, window?.innerHeight || 800],
    [-15, 15],
  );

  useEffect(() => {
    // if (localStorage.getItem("authToken")) {
    //   router.push("/instances");
    // }
    if (isConnected) {
      router.push("/instances");
    }
  }, [isConnected, router]);

  // Update mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const onConnect = () => {
    open();
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-start gap-10 bg-appGray dark:bg-dark lg:gap-[5vh]">
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
          src={"/images/main.png"}
          fill
          className="object-contain dark:hidden"
          alt="banner"
        />
        <Image
          src={"/images/main-dark.png"}
          fill
          className="hidden object-contain dark:flex"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default Login;
