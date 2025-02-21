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
    <div className="z-10 w-[250px] ">
      <QueryClientProvider client={queryClient}>
        {/* <appkit-button /> */}
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="relative h-16 w-16 rounded-md bg-[#0100fb] p-2 ">
            <Image
              src="/images/logos/logo-white.png"
              alt="Logo Icon"
              fill
              className="p-2"
            />
          </div>
          <p className="mt-4 text-center text-3xl   font-medium text-[#4c4c4c]">
            Welcome
          </p>
          <p className="mb-8 mt-4 flex flex-col p-0 text-center text-lg font-medium leading-tight text-[#a3a3a3]">
            <span>Connect your wallet</span>
            <span>to continue to Skyops app</span>
          </p>
          <button
            className="flex w-full items-center justify-center rounded-lg border border-[#F7FF98] bg-[#0100fb] py-2 transition-all duration-300 ease-in-out hover:bg-[#004cff] hover:text-white"
            onClick={onConnect}
          >
            <div className="SpaceMono w-full text-[16px] font-bold leading-7 text-white transition-all duration-300 ease-in-out hover:text-white sm:text-[16px]">
              Connect Wallet
            </div>
          </button>
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default Login;
