"use client";
import { deductPoints, getAllUsers, getUserDetails } from "@/actions/verify";
import { useAppSelector } from "@/redux/hooks";
import { setUser, setUserWithRank } from "@/redux/slices/userSlice";
import { ABI } from "@/utils/helpers";
import { useAppKitAccount } from "@reown/appkit/react";
import { Wallet } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const MAX_RETRIES = 3;

const RETRY_DELAY_MS = 1500;

const wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY as string);

const Tasks = () => {
  // --------------------------------------------VARIABLES
  const { address } = useAppKitAccount();
  const { user, userWithRank, balance } = useAppSelector((state) => state.user);
  const [claimAmount, setClaimAmount] = useState("");
  const [txId, setTxId] = useState<string | null>(null);
  const { writeContractAsync, data: txData } = useWriteContract();

  const {
    isLoading: isConfirming,

    isSuccess: isConfirmed,

    isError,

    error,
  } = useWaitForTransactionReceipt({
    hash: txData,
  });

  const refUrl = `https://app.skyopslabs.ai?invite=${user?.code ?? ""}`;
  const dispatch = useDispatch();

  // Helper to build messageParams for a given claim amount
  const getMessageParams = (amount: number) => ({
    types: {
      ExtensionClientData: [
        { name: "client", type: "address" },
        { name: "points", type: "uint256" },
        { name: "server", type: "address" },
      ],
    },
    domain: {
      name: "skyopslabs.ai",
      version: "1",
      chainId: 1,
      verifyingContract: process.env.NEXT_PUBLIC_REWARDS_CA,
    },
    messages: {
      client: address,
      points: amount,
      server: process.env.NEXT_PUBLIC_REWARDS_CA,
    },
  });

  //-----------------------------------------------------------FUNCTIONS
  const copyInviteLink = () => {
    navigator.clipboard.writeText(refUrl);
    toast.success("Invite link copied");
  };

  const handleWriteSmartContract = async (amount?: number) => {
    const claimVal = typeof amount === "number" ? amount : Number(claimAmount);
    if (!user?.points || user.points === 0) {
      toast.error("No points to claim");
      return;
    }
    if (!claimVal || isNaN(claimVal) || claimVal <= 0) {
      toast.error("Enter a valid claim amount");
      return;
    }
    if (claimVal > user.points) {
      toast.error("Cannot claim more than available points");
      return;
    }
    const id = toast.loading("Signing...");
    setTxId(id);
    try {
      const params = getMessageParams(claimVal);
      const raw = await wallet.signTypedData(
        params.domain,
        params.types,
        params.messages,
      );
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_REWARDS_CA as `0x${string}`,
        abi: ABI,
        functionName: "claimRewards",
        args: [
          {
            client: address,
            points: claimVal,
            server: process.env.NEXT_PUBLIC_REWARDS_CA as `0x${string}`,
            signature: raw,
          },
        ],
      });
    } catch (err: any) {
      console.error(err.message, "Error");
      const match = err.message?.match(/reverted: ([^\n]*)/i);
      const revertReason = match ? match[1].trim() : "An error Occurred";
      toast.error(revertReason, { id: id });
    }
  };

  //------------------------------------------------------------------USE EFFECTS

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      if (isMounted) {
        const userDetails = await getUserDetails(address as string);

        dispatch(setUser(userDetails));
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    const getAll = async () => {
      const res = await getAllUsers();
      const singleUser = res.find((item) => item.wallet == user?.wallet);
      if (singleUser) {
        dispatch(setUserWithRank(singleUser));
      }
    };
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    let attempts = 0;

    const claimPoints = async () => {
      while (attempts < MAX_RETRIES) {
        const data = await deductPoints(
          user?.wallet as string,

          Number(claimAmount) * 0.4, // Deduct 40% of points

          "Claim",
        );

        if (data.error) {
          toast.error(data.message ?? "Error deducting points", {
            id: txId as string,
          });

          attempts++;

          console.error(`Attempt ${attempts} failed:`, data.message);

          if (attempts < MAX_RETRIES) {
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempts)); // Exponential-ish backoff
          } else {
            toast.error("Failed to deduct points after retries.");
          }
        } else {
          toast.success(data.message, { id: txId as string });

          const userDetails = await getUserDetails(address as string);

          dispatch(setUser(userDetails));

          return;
        }
      }
    };

    if (isConfirmed) {
      claimPoints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, user?.wallet, address]);

  useEffect(() => {
    if (isError) {
      toast.error("Transaction not confirmed", { id: txId as string });
    }
  }, [isError, txId]);

  return (
    <div className="w-full">
      <div className="flex h-[64px] items-center justify-between border-b border-border px-5 dark:border-dark-3 lg:px-10">
        <h4 className="text-2xl font-medium text-appBlack dark:text-white  lg:text-[28px]">
          Rewards
        </h4>
      </div>

      <section className="flex w-full flex-col  gap-4  lg:flex-row lg:gap-3 lg:p-4">
        <div className="flex w-full flex-col lg:w-[50%]">
          <div className="w-full bg-white dark:bg-dark-2">
            <div className=" m-5 flex items-center gap-3 lg:m-6 lg:gap-3.5">
              <div className="h-12 w-12 rounded-full bg-[#F24924]" />

              <div>
                <p className="font-semibold text-black dark:text-white">
                  Bound Point Account
                </p>

                <p className="text-black/[0.48] dark:text-white/[.48]">
                  {address?.slice(0, 7)}...
                  {address?.slice(-6)}
                </p>
              </div>
            </div>

            <div className=" m-5 flex h-[232px] flex-col bg-black  lg:m-2 lg:h-[336px]">
              <div className="flex h-1/2 border-b-[1px] border-white/10 px-4 ">
                <div className="w-1/2 border-r-[1px] border-white/10">
                  <p className="h-1/2 pt-4 text-sm font-medium text-white/[.49]">
                    Mining Points
                  </p>

                  <p className="flex h-1/2 items-end pb-4 text-[32px] font-medium leading-none text-white">
                    {`${user?.points ?? 0}`}
                  </p>
                </div>

                {/* <div className="w-1/2 px-4 ">
                  <p className="h-1/2 pt-4 text-sm font-medium text-white/[.49]">
                    Rank
                  </p>

                  <p className="flex h-1/2 items-end pb-4 text-[32px] font-medium leading-none text-white">
                    {userWithRank.rank ? userWithRank.rank : 0}
                  </p>
                </div> */}
              </div>

              <div className=" flex flex-1 flex-col justify-between  p-4 ">
                <div className=" flex items-center justify-between">
                  <p className="text-sm font-medium text-white/[.49]">
                    SKYOPS Available for Claim
                  </p>

                  <p className="text-sm  text-white underline">What is this?</p>
                </div>

                <div className="flex w-full items-center justify-between">
                  <div className="flex w-[40%] flex-row  items-center gap-1 rounded-lg bg-dark-2 p-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      value={claimAmount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val)) {
                          const num = Number(val);
                          if (num <= (user?.points ?? 0)) {
                            setClaimAmount(val);
                          }
                        }
                      }}
                      className={`min-w-0 flex-1 border-none bg-transparent text-2xl font-semibold text-white outline-none`}
                      placeholder="0.0"
                      disabled={!user?.points}
                      autoComplete="off"
                      style={{ width: 100 }}
                    />
                    <button
                      className="whitespace-nowrap rounded bg-dark px-2 py-1 text-xs text-[#A3A9BA] hover:bg-dark/10"
                      onClick={() =>
                        setClaimAmount((user?.points ?? 0).toString())
                      }
                      type="button"
                      disabled={!user?.points}
                    >
                      Max
                    </button>
                    <Image
                      width={18}
                      height={18}
                      alt="icon"
                      className="flex"
                      src={"/images/icon/icon-white.svg"}
                    />
                  </div>
                  <button
                    onClick={() =>
                      handleWriteSmartContract(Number(claimAmount))
                    }
                    className="bg-prim2 px-8 py-2 font-medium text-white duration-200 active:scale-90 disabled:cursor-not-allowed disabled:active:scale-100 dark:bg-white dark:text-black dark:disabled:opacity-30"
                    disabled={
                      !claimAmount ||
                      isNaN(Number(claimAmount)) ||
                      Number(claimAmount) <= 0 ||
                      Number(claimAmount) > (user?.points ?? 0)
                    }
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="mt- w-full bg-white pb-8 pt-5 dark:bg-dark-2 lg:mt-5 lg:pt-6">
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
                <div className="max-h-[60vh] overflow-y-scroll">
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
            </div> */}
          </div>
        </div>
        <div className="flex w-full flex-col lg:w-[50%]">
          <div className="w-full bg-white p-5 dark:bg-dark-2 lg:p-6">
            <h6 className="mb-4 text-xl font-medium text-appBlack dark:text-white lg:mb-6 lg:text-[22px]">
              Invite Friends
            </h6>
            <ul className="flex list-outside list-decimal flex-col gap-1 pl-3">
              <li className="text-sm text-appBlack dark:text-white/[.48]">
                You&apos;ll earn 50 points when your invited user reaches a
                total of 100 USDT in transactions for the first time.
              </li>
              <li className="text-sm text-appBlack dark:text-white/[.48]">
                When you invite user B and user B uses Skyops for trading, you
                will receive 10% of the points that B earns.
              </li>
              <li className="text-sm text-appBlack dark:text-white/[.48]">
                When user B invites user C and user C uses Skyops for trading,
                user B will receive 10% of the points that C earns, and you will
                receive 5% of the points that C earns.
              </li>
            </ul>
            -{" "}
            <span className="text-xs text-green-700">
              *Note: Earning points via referral trades coming soon!
            </span>
            <div className="mb-4 mt-4 flex h-[60px] items-center justify-between border border-black/10 px-4.5  dark:border-dark-3 lg:mb-3 lg:mt-6">
              <p className="text-sm text-appBlack dark:text-white">{refUrl}</p>
              <svg
                width="20"
                height="20"
                fill="none"
                className="text-appBlack/70 hover:cursor-pointer active:scale-95 dark:text-white/70"
                onClick={copyInviteLink}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#prefix__clip0_651_79)">
                  <path
                    d="M4.164 12.5c-.777 0-1.165 0-1.471-.127a1.667 1.667 0 01-.902-.902c-.127-.306-.127-.695-.127-1.471V4.333c0-.933 0-1.4.182-1.756.16-.314.414-.569.728-.729.357-.181.823-.181 1.757-.181h5.666c.777 0 1.165 0 1.472.126.408.17.732.494.902.902.126.307.126.695.126 1.472m-2.333 14.166h5.5c.934 0 1.4 0 1.757-.181.313-.16.568-.415.728-.729.182-.356.182-.823.182-1.756v-5.5c0-.934 0-1.4-.182-1.757a1.667 1.667 0 00-.728-.729c-.357-.181-.823-.181-1.757-.181h-5.5c-.933 0-1.4 0-1.757.181-.313.16-.568.415-.728.729-.182.356-.182.823-.182 1.756v5.5c0 .934 0 1.4.182 1.757.16.314.415.569.728.729.357.181.824.181 1.757.181z"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="prefix__clip0_651_79">
                    <path fill="transparent" d="M0 0h20v20H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex h-[60px] items-center justify-between border border-black/10 px-4.5  dark:border-dark-3 ">
              <p className="text-sm text-appBlack dark:text-white">
                {user?.code}
              </p>
              <svg
                width="20"
                height="20"
                fill="none"
                className="text-appBlack/70 hover:cursor-pointer active:scale-95 dark:text-white/70"
                onClick={() => {
                  navigator.clipboard.writeText(user?.code);
                  toast.success("Copied");
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#prefix__clip0_651_79)">
                  <path
                    d="M4.164 12.5c-.777 0-1.165 0-1.471-.127a1.667 1.667 0 01-.902-.902c-.127-.306-.127-.695-.127-1.471V4.333c0-.933 0-1.4.182-1.756.16-.314.414-.569.728-.729.357-.181.823-.181 1.757-.181h5.666c.777 0 1.165 0 1.472.126.408.17.732.494.902.902.126.307.126.695.126 1.472m-2.333 14.166h5.5c.934 0 1.4 0 1.757-.181.313-.16.568-.415.728-.729.182-.356.182-.823.182-1.756v-5.5c0-.934 0-1.4-.182-1.757a1.667 1.667 0 00-.728-.729c-.357-.181-.823-.181-1.757-.181h-5.5c-.933 0-1.4 0-1.757.181-.313.16-.568.415-.728.729-.182.356-.182.823-.182 1.756v5.5c0 .934 0 1.4.182 1.757.16.314.415.569.728.729.357.181.824.181 1.757.181z"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="prefix__clip0_651_79">
                    <path fill="transparent" d="M0 0h20v20H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h6 className="my-4 w-full text-center  text-black/[.28] dark:text-white/[.28] lg:my-6">
              OR
            </h6>
            <div className="flex w-full items-center justify-center gap-2">
              <Link
                target="_blank"
                href={`https://t.me/share/url?url=${refUrl}&text=${encodeURIComponent("Just joined @SkyopsLabs campaign. Join with my ref ID:")}
`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray dark:bg-dark"
              >
                <Image
                  src={"/images/icon/telegram.svg"}
                  width={20}
                  height={20}
                  alt="tg"
                />
              </Link>
              <Link
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(`Just joined @SkyopsLabs campaign. Join with my ref ID: ${refUrl}
`)}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray text-appBlack dark:bg-dark dark:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__clip0_651_102)">
                    <path
                      d="M10.677 7.622L17.234 0H15.68L9.988 6.618 5.44 0H.195l6.877 10.007L.195 18H1.75l6.012-6.989L12.564 18h5.244L10.677 7.622zM8.55 10.096l-.696-.997-5.544-7.93h2.387l4.473 6.4.697.996 5.815 8.319h-2.386l-4.746-6.788z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0_651_102">
                      <path fill="transparent" d="M0 0h18v18H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-1 flex-col items-center justify-center bg-white px-[50px] py-8 dark:bg-dark-2 lg:mt-3 lg:px-[74px] lg:py-[99px] ">
            <Image
              width={212}
              height={198.12}
              src={"/images/clusters/empty-cluste.png"}
              alt="Logo"
              className="dark:hidden"
            />
            <Image
              width={212}
              height={198.12}
              src={"/images/clusters/empty-cluster-white.png"}
              alt="Logo"
              className="hidden dark:flex"
            />
            <div className=" mt-8 flex flex-col items-center gap-[6px]   lg:mt-[56px]">
              <h6 className=" text-[22px] font-semibold text-black dark:text-white lg:text-[28px]">
                Mining Rewards
              </h6>
              <p className="text-center text-base text-black/[.48] dark:text-white/[.48]">
                Skyops will extract publicly available data from AI model
                training. As a reward, you&apos;ll receive mining points.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Tasks;
