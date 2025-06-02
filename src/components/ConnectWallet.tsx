"use client";

import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";

const walletImages = [
  "/images/icon/trust.svg",
  "/images/icon/coinbase.svg",
  "/images/icon/metamask.svg",
  "/images/icon/connect.svg",
  "/images/icon/phantom.svg",
];

export default function ConnectWallet() {
  const { open } = useAppKit();

  const onConnect = () => {
    open();
  };

  return (
    <div className="flex items-center gap-2 rounded-[16px] bg-white p-2 dark:bg-dark-2">
      <div className="hidden items-center gap-3 lg:flex">
        {walletImages.map((item) => (
          <Image
            className="duration-300 ease-in-out hover:scale-90"
            key={item}
            src={item}
            width={56}
            height={56}
            alt="Wallet"
          />
        ))}
      </div>
      <button
        onClick={onConnect}
        className="hidden rounded-[12px] bg-prim2 p-4 font-medium text-white duration-100 active:scale-95 dark:bg-white dark:text-black lg:flex lg:bg-appBlack lg:hover:bg-appBlack/70 lg:dark:bg-white/10 lg:dark:text-white"
      >
        Connect Wallet
      </button>
      <button
        onClick={onConnect}
        className="flex rounded-[12px] bg-prim2 p-4 font-medium text-white duration-100 active:scale-95 dark:bg-white dark:text-black lg:hidden lg:bg-appBlack lg:hover:bg-appBlack/70 lg:dark:bg-white/10 lg:dark:text-white"
      >
        Connect
      </button>
    </div>
  );
}
