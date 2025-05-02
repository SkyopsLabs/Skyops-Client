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
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { writeContractAsync } = useWriteContract();
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
    try {
      if (!amount || !publicClient || !address || !walletClient) {
        toast.error("Please check your wallet connection");
        return;
      }

      let hash;

      let allowance: any = await publicClient?.readContract({
        address: TOKEN_CONTRACT,
        abi: TokenABI,
        functionName: "allowance",
        args: [address, PAYMENT_CONTRACT],
      });

      if (allowance < parseEther(amount.toString())) {
        hash = await writeContractAsync({
          address: TOKEN_CONTRACT,
          abi: TokenABI,
          functionName: "approve",
          args: [PAYMENT_CONTRACT, parseEther(amount.toString())],
        });

        await publicClient?.waitForTransactionReceipt({ hash });
      }

      allowance = await publicClient?.readContract({
        address: TOKEN_CONTRACT,
        abi: TokenABI,
        functionName: "allowance",
        args: [address, PAYMENT_CONTRACT],
      });

      if (allowance >= parseEther(amount.toString())) {
        hash = await writeContractAsync({
          address: PAYMENT_CONTRACT,
          abi: PaymentABI,
          functionName: "deposit",
          args: [parseEther(amount.toString())],
        });

        await publicClient?.waitForTransactionReceipt({ hash });

        // Save billing
        const billings_ = await saveBillingTx(amount);
        setBillings(billings_);
        await refetchUserData();
        toast.success("Deposit Success!");
      }
    } catch (error: any) {
      toast.error(
        error instanceof BaseError
          ? error.shortMessage
          : "User rejected tx submit",
      );
    }
  };

  return (
    <div className="mt-[64px] flex flex-col lg:mt-0">
      <div className="mx-auto w-full   bg-white p-5 dark:bg-dark-2 lg:mt-4 lg:w-[726px] lg:p-6">
        <div className="mb-4 flex h-[56px] items-center justify-between lg:mb-0 lg:h-[64px]">
          <h4 className="text-2xl font-medium text-appBlack  dark:text-white lg:text-[28px]">
            Top-up
          </h4>
          <div className=" flex w-max  justify-between gap-1.5">
            <p className="text-sm text-[#01020C7A]  opacity-50 dark:text-white/[.48]">
              SKYOPS Balance:
            </p>
            <div className="flex items-center  gap-1">
              <p className="text-[#01020C] dark:text-white">{0}</p>
              <Image
                width={16}
                height={16}
                alt="icon"
                className="dark:hidden"
                src={"/images/icon/icon.svg"}
              />
              <Image
                width={16}
                height={16}
                alt="icon"
                src={"/images/icon/icon-white.svg"}
                className="hidden dark:flex"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Add Tokens"
            className="mb-3 h-[60px] w-full appearance-none border-[1px]  border-black/10 bg-transparent px-5.5 py-2 text-dark outline-none transition placeholder:text-black/30 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:placeholder:text-white/[.48] dark:focus:border-primary "
            value={amount ?? ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <RadioButton setAmount={setAmount} />
          <button
            className="mt-5 h-[40px] w-full bg-prim px-5 py-1 font-medium text-white dark:bg-white dark:text-black lg:mt-6 lg:h-[60px] lg:px-8 xl:px-10"
            onClick={handleAddCredits}
          >
            Add Tokens
          </button>
        </div>
      </div>
      <div className="mx-auto mt-4   w-full bg-white p-6 dark:bg-dark-2 lg:w-[726px]">
        {/* Top up transactions */}
        <h4 className="text-2xl font-medium text-appBlack  dark:text-white lg:text-[28px]">
          History
        </h4>
        <div className="">
          <div className="grid h-[56px] grid-cols-[1.5fr,1.5fr,1.5fr] place-content-center border-b border-border2  dark:border-dark-3 lg:h-[64px]">
            <div className=" flex items-center justify-start ">
              <p className="text-sm text-appBlack/[.48] dark:text-white/[.48]">
                Date
              </p>
            </div>
            <div className="flex items-center justify-center ">
              <p className="text-sm text-appBlack/[.48] dark:text-white/[.48]">
                Amount
              </p>
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm text-appBlack/[.48] dark:text-white/[.48]">
                Currency
              </p>
            </div>
          </div>
          {billing.map((item, index) => (
            <div
              key={index.toString()}
              className="grid h-[56px] grid-cols-[1.5fr,1.5fr,1.5fr] place-content-center border-b border-border2  dark:border-dark-3 lg:h-[64px]"
            >
              <div className=" flex items-center justify-start ">
                <p className="text-sm text-appBlack dark:text-white">
                  {item.date}
                </p>
              </div>
              <div className="flex items-center justify-center ">
                <p className="text-sm text-appBlack dark:text-white">
                  {item.amount}
                </p>
              </div>
              <div className="flex items-center justify-end">
                <p className="text-sm text-appBlack dark:text-white">
                  {item.currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="mx-auto my-5 flex w-full items-center justify-between px-5 lg:max-w-[726px] lg:px-0">
        <p className="text-sm text-black/[.48] dark:text-white/[.48]">Prev</p>
        <div className="flex items-center gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-black text-sm font-medium text-white dark:bg-[#1e1e1e]">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-[11px] border border-black/10  text-sm font-medium text-black/[.48] dark:border-white/10 dark:text-white/[.48]">
            2
          </button>
        </div>
        <p className="text-sm text-black/[.48] dark:text-white/[.48]">Next</p>
      </div>
    </div>
  );
};

export default BillingPage;
