"use client";

import { getBillings, saveBillingTx } from "@/apis/api-v1";
import RadioButton from "@/components/Buttons/RadioButton";
import { useApp } from "@/components/Layouts/AppProvider";
import { IBilling } from "@/types";
import { PaymentABI, TokenABI } from "@/web3/abis/abi";
import { PAYMENT_CONTRACT, TOKEN_CONTRACT } from "@/web3/constants";
import { useAppKitAccount } from "@reown/appkit/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import {
  BaseError,
  usePublicClient,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import SwapSection from "../rewards/tasks/SwapSection";

const billing = [
  {
    date: "05.03.2025",
    amount: "$25",
    currency: "50 SKYOPS",
  },
  {
    date: "05.03.2025",
    amount: "$25",
    currency: "50 SKYOPS",
  },
  {
    date: "05.03.2025",
    amount: "$25",
    currency: "50 SKYOPS",
  },
  // {
  //   date: "05.03.2025",
  //   amount: "$25",
  //   currency: "50 SKYOPS",
  // },
];

const BillingPage = () => {
  const { address } = useAppKitAccount();
  const { user, refetchUserData } = useApp();

  const [billings, setBillings] = useState<IBilling[] | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("authToken") || !user) return;
    (async () => {
      const _ = await getBillings();
      setBillings(_);
    })();
  }, [user]);

  const handleAddCredits = async () => {
    toast.success("Coming Soon");
  };

  return (
    <div className="mx-auto my-2 flex  max-h-[calc(100vh-100px)] min-h-0 w-full max-w-2xl flex-col lg:w-[50%]">
      <div className="w-full flex-shrink-0 bg-white dark:bg-dark-2">
        <div className="m-5 flex flex-col bg-black lg:m-2">
          <SwapSection />
        </div>
      </div>
      <div className="mt-5 min-h-0 w-full flex-1 overflow-hidden bg-white pb-8 pt-5 dark:bg-dark-2 lg:mt-5 lg:pt-6">
        <h6 className="px-5 text-xl font-medium text-appBlack dark:text-white lg:px-6 lg:text-[22px]">
          History
        </h6>

        <div className="w-full ">
          <div className="grid h-[56px] grid-cols-[0.8fr,1fr,0.4fr] place-content-center border-b-[1px] border-border2 px-5 dark:border-dark-3 lg:h-[64px] lg:px-6">
            <p className="flex items-start text-sm text-appBlack dark:text-white/[0.48]">
              Date
            </p>
            <p className="flex items-start text-sm text-appBlack dark:text-white/[0.48]">
              Type
            </p>
            <p className="flex justify-end text-sm text-appBlack dark:text-white/[0.48]">
              iSKYOPS
            </p>
          </div>
          <div className="h-full max-h-[40vh] overflow-y-auto">
            {Array.isArray(user?.pointsHistory) &&
              [...user?.pointsHistory].reverse().map((item, index) => (
                <div
                  key={index.toString()}
                  className="grid h-[56px] grid-cols-[0.8fr,1fr,0.4fr] place-content-center border-b-[1px] border-border2 px-5 dark:border-dark-3 lg:h-[64px] lg:px-6"
                >
                  <p className="flex items-start text-sm text-appBlack dark:text-white">
                    {item.date}
                  </p>
                  <p className="flex items-start text-sm text-appBlack dark:text-white">
                    {item.type}
                  </p>
                  <p
                    className={`flex justify-end text-sm ${item.points > 0 ? "text-green" : "text-red"}`}
                  >
                    {item.points > 0 ? "+" : ""}
                    {item.points}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
