"use client";

import { useEffect, useState } from "react";
import RadioButton from "@/components/Buttons/RadioButton";
import {
  BaseError,
  useAccount,
  usePublicClient,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import toast from "react-hot-toast";
import { useApp } from "@/components/Layouts/AppProvider";
import { getBillings, saveBillingTx } from "@/apis/api-v1";
import { IBilling } from "@/types";
import { PAYMENT_CONTRACT, TOKEN_CONTRACT } from "@/web3/constants";
import { PaymentABI, TokenABI } from "@/web3/abis/abi";
import { parseEther } from "viem";

const BillingPage = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
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
    <div
      className="
        mt-5
        overflow-auto
        rounded-[10px]
        bg-white
        shadow-1
        dark:bg-gray-dark
        dark:shadow-card
        sm:h-[80vh]
      "
    >
      <div className="flex flex-col">
        <p className="m-5 text-body-2xlg font-bold text-dark dark:text-lime-50">
          Billing
        </p>
        <div className="flex">
          <div className="mx-5 mb-3 w-64 rounded-lg border border-gray-300 p-3">
            <h2 className="text-md font-bold">Balance</h2>
            <p className="pt-2 text-lg font-bold text-gray-600">
              {user ? user.balance : "0.00"}
            </p>
          </div>
          <div className="mx-5 mb-3 w-64 rounded-lg border border-gray-300 p-3">
            <h2 className="text-md font-bold">Tokens</h2>
            <p className="pt-2 text-lg font-bold text-gray-600">
              {user ? user.tokens : "0.00"}
            </p>
          </div>
        </div>
        <div className="flex flex-col text-base">
          <p className="m-5">Add Credits</p>
          <div className="mx-5 flex flex-col sm:flex-row">
            <RadioButton setAmount={setAmount} />
            <div className="my-2 sm:my-0">
              <input
                type="number"
                placeholder="Amount to charge"
                className="min-w-20 max-w-50 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-2 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary sm:mx-2"
                value={amount ?? ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <button
                className="mx-2 rounded-[5px] bg-[#0000FE] px-5 py-1 text-white lg:px-8 xl:px-10"
                onClick={handleAddCredits}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        {/* Top up transactions */}
        <p className="mx-5 mt-10 font-bold">Top Up Transactions</p>
        <div className="p-4">
          <div className="grid grid-cols-8 border-t border-gray-300 px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
            <div className="col-span-3 mb-10 flex items-center sm:col-span-3">
              <p className="md:text-md text-sm">Date</p>
            </div>
            <div className="col-span-3 mb-10 items-center sm:col-span-3">
              <p className="md:text-md text-sm">Amount</p>
            </div>
            <div className="col-span-2 mb-10 flex items-center sm:col-span-2">
              <p className="md:text-md text-sm">Currency</p>
            </div>
            {billings &&
              billings.length > 0 &&
              billings.map((item: IBilling, idx: number) => (
                <>
                  <div
                    className="col-span-3 flex items-center border-b pb-3 dark:border-dark-3 sm:col-span-3"
                    key={`created_at_${idx}`}
                  >
                    <p className="text-xs sm:text-base">{item.created_at}</p>
                  </div>
                  <div
                    className="col-span-3 items-center border-b pb-3 dark:border-dark-3 sm:col-span-3"
                    key={`amount_${idx}`}
                  >
                    <p className="text-xs sm:text-base">{item.amount}</p>
                  </div>
                  <div
                    className="col-span-2 flex items-center border-b pb-3 dark:border-dark-3 sm:col-span-2"
                    key={idx}
                  >
                    <p className="text-xs sm:text-base">USDT</p>
                  </div>
                </>
              ))}
          </div>

          {/* Pagination */}
          <div className="my-3 flex items-center justify-center font-bold">
            <button className="mx-3 rounded-[10px] bg-gray-100 p-2 text-sm text-gray-500">
              {"<"}
            </button>
            <button className="mx-3 rounded-[10px] bg-gray-300 p-2 px-3 text-sm text-gray-500">
              {"1"}
            </button>
            <button className="mx-3 rounded-[10px] bg-gray-100 p-2 text-sm text-gray-500">
              {">"}
            </button>
          </div>
        </div>

        {/* Billing history */}
        {/* <p className="mx-5 mt-10 font-bold">Billing History</p> */}
        {/* <div className="p-4"> */}
        {/* <div className="grid grid-cols-8 border-b border-t border-gray-300 p-4 px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="text-sm sm:text-xl">Date</p>
            </div>
            <div className="col-span-3 items-center">
              <p className="text-sm sm:text-xl">Amount</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm sm:text-xl">Currency</p>
            </div>
          </div> */}

        {/* Pagination */}
        {/* <div className="my-3 flex items-center justify-center font-bold">
            <button className="mx-3 rounded-[10px] bg-gray-100 p-3 text-sm text-gray-500">
              {"<"}
            </button>
            <button className="mx-3 rounded-[10px] bg-gray-300 p-3 px-5 text-sm text-gray-500">
              {"1"}
            </button>
            <button className="mx-3 rounded-[10px] bg-gray-300 p-3 text-sm text-gray-500">
              {">"}
            </button>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default BillingPage;
