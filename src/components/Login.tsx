"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import MetamaskSvg from "@/components/MetamaskSvg";
import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";
import Loader from "./common/Loader";
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

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     router.push("/instances");
  //   }
  //   if (isConnected) {
  //     router.push("/instances");
  //   }
  // }, [isConnected]);

  const onConnect = () => {
    open();
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-start gap-10 bg-appGray lg:gap-20">
      <div
        id="header"
        className="flex w-full items-center justify-between px-5 pt-6 lg:px-8  lg:pt-8"
      >
        <div id="logo" className=" flex items-center gap-3  ">
          <Image
            src={"/images/logos/logo-blue.png"}
            width={37}
            height={32}
            alt="logo"
          />
          <h6 className="text-[22px] font-bold leading-[24px] tracking-[-2%] text-[#01020C]">
            Skyops
          </h6>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-[16px] bg-white p-2">
            <div className="hidden items-center gap-3 lg:flex ">
              {images.map((item) => (
                <Image src={item} width={56} height={56} alt={item} />
              ))}
            </div>
            <button
              onClick={onConnect}
              className="rounded-[12px] bg-prim2 p-4 font-medium text-white duration-100 hover:bg-appBlack/70 active:scale-95 lg:bg-appBlack"
            >
              Connect Wallet
            </button>
          </div>
          <div className="hidden rounded-[16px] bg-white p-2 lg:flex">
            <button className="durationn-100 rounded-[12px] bg-prim2 p-4 font-medium text-white hover:bg-prim2/80">
              Use Referral Code
            </button>
          </div>
        </div>
      </div>
      <section className=" flex flex-col items-center">
        <h1 className="text-[48px] font-medium text-appBlack lg:text-[64px]">
          Join Skyops
        </h1>
        <p className="max-w-[243px] text-center text-lg leading-6 text-appBlack/[.48]">
          Revolutionize AI Scalability and Accessibility
        </p>
      </section>
      <div className="relative h-[767px] w-[859px]">
        <Image
          src={"/images/login_banner.png"}
          fill
          className="object-contain"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default Login;
