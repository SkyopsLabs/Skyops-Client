"use client";
import {
  authenticateDiscord,
  authenticateGmail,
  authenticateTelegram,
  authenticateTwitter,
  deductPoints,
  getAllUsers,
  getUserDetails,
} from "@/actions/verify";
import { useSolanaTransaction } from "@/hooks/useSolanaTransaction";
import { useAppSelector } from "@/redux/hooks";
import { setUser, setUserWithRank } from "@/redux/slices/userSlice";
import { AppSession } from "@/types";
import { idl, SolRewards } from "@/types/idl";
import { getOwner } from "@/utils/admin";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import {
  getOrCreateAssociatedTokenAccount,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { Ed25519Program, Keypair, PublicKey } from "@solana/web3.js";
import telegramAuth from "@use-telegram-auth/client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import nacl from "tweetnacl";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

const Tasks = () => {
  // --------------------------------------------VARIABLES
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider("solana");

  anchor.setProvider(walletProvider as unknown as anchor.AnchorProvider);
  const program = new Program(idl as SolRewards);
  const [state] = PublicKey.findProgramAddressSync(
    [Buffer.from("state")],
    program.programId,
  );
  const vault = new PublicKey(process.env.NEXT_PUBLIC_VAULT as string);
  const { address } = useAppKitAccount();
  const { data, status } = useSession();
  const [txId, setTxId] = useState<string | null>(null);
  const { user, userWithRank } = useAppSelector((state) => state.user);
  const refUrl = `https://app.skyopslabs.ai?invite=${user?.code ?? ""}`;
  const dispatch = useDispatch();
  const { sendCustomTransaction, isLoading, error } = useSolanaTransaction();

  const appSession: AppSession = data?.user as AppSession;

  //-----------------------------------------------------------FUNCTIONS

  // Write to the smart contract and check if the transaction is successful with useEffect
  const handleWriteSmartContract = async () => {
    if ((user?.points as number) == 0 || !user.points) {
      toast.error("No points to claim");
      return;
    }
    const id = toast.loading("Signing...");
    setTxId(id);

    try {
      const secretKeyString = await getOwner();
      const key = JSON.parse(secretKeyString);
      const secretKey = Uint8Array.from(key);
      const owner = Keypair.fromSecretKey(secretKey);
      const userPubKey = new PublicKey(user.wallet);
      const tokenMint = new PublicKey(
        "9TVXPG2EY1ctYRXJJmEqcXRZ1mB1kstr7VQwPFXceXSR",
      );
      const userAta = (
        await getOrCreateAssociatedTokenAccount(
          connection as anchor.web3.Connection,
          owner,
          tokenMint,
          userPubKey,
          true,
          undefined,
          undefined,
          TOKEN_2022_PROGRAM_ID,
        )
      ).address;
      const createSignedVerification = (userKey: string, points: number) => {
        const user = new PublicKey(userKey);
        const msgBuffer = Buffer.concat([
          user.toBuffer(),
          Buffer.from(new anchor.BN(points).toArrayLike(Buffer, "le", 8)),
        ]);

        // Sign the message with the owner's private key
        const sig = nacl.sign.detached(msgBuffer, owner.secretKey);

        // Create the Ed25519 instruction
        return Ed25519Program.createInstructionWithPublicKey({
          publicKey: owner.publicKey.toBytes(),
          message: msgBuffer,
          signature: sig,
        });
      };
      const ed25519Ix = createSignedVerification(
        userPubKey.toString(),
        user.points,
      );
      const claimIx = await program.methods
        .claimRewards(new anchor.BN(user.points))
        .accounts({
          user: userPubKey,
          state: state,
          vault,
          mint: tokenMint,
          userToken: userAta,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .instruction();

      const res = await sendCustomTransaction([ed25519Ix, claimIx]);
      if (res === null) {
        console.log("Transaction Failed");
        // toast.error("Transaction failed", { id: id });
      } else {
        console.log(res, "response");
        let attempts = 0;
        const claimPoints = async () => {
          while (attempts < MAX_RETRIES) {
            const data = await deductPoints(
              user.wallet as string,
              user.points as number,
              "Claim",
            );
            if (data.error) {
              toast.error(data.message ?? "Error deducting points", { id: id });
              attempts++;
              console.error(`Attempt ${attempts} failed:`, data.message);
              if (attempts < MAX_RETRIES) {
                await new Promise((r) =>
                  setTimeout(r, RETRY_DELAY_MS * attempts),
                ); // Exponential-ish backoff
              } else {
                toast.error("Failed to deduct points after retries.", {
                  id: id,
                });
              }
            } else {
              toast.success(data.message, { id: id });
              const userDetails = await getUserDetails(address as string);
              dispatch(setUser(userDetails));
              return;
            }
          }
        };
        claimPoints();
      }

      // toast.success("Transaction confirmed", { id: id });
    } catch (err) {
      console.error(error, "Error");
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(refUrl);
    toast.success("Invite link copied");
  };
  const signInwithTwitter = async () => {
    console.log(status);
    // return;
    if (user?.x_id) {
      console.log(data);
      return;
    }
    try {
      const res = await signIn("twitter", {
        callbackUrl: "/rewards/tasks",
        redirect: false,
      });
      console.log(res, "response");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const signInwithDiscord = async () => {
    console.log(status);
    // return;
    if (user?.discord_id) {
      console.log(data);
      return;
    }
    try {
      const res = await signIn("discord", {
        callbackUrl: "/rewards/tasks",
        redirect: false,
      });
      console.log(res, "response");
    } catch (error) {
      console.log(error, "error");
    }
  };
  const signInwithGoogle = async () => {
    console.log(status);
    if (user?.gmail) {
      console.log(data);
      return;
    }
    try {
      const res = await signIn("google", {
        callbackUrl: "/rewards/tasks",
      });
      console.log(res, "response");
    } catch (error) {
      console.log(error, "error");
    }
  };
  const signInwithTeleGram = async () => {
    let message = "";
    console.log(status);
    if (user?.tg_id) {
      console.log(data);
      return;
    }
    try {
      const res = await telegramAuth("7902207050", {
        windowFeatures: { popup: true },
      });
      message = await authenticateTelegram(
        address as string,
        res.id,
        res.username,
      );
      toast.success(message);
      const userDetails = await getUserDetails(address as string);
      dispatch(setUser(userDetails));
      console.log(res, userDetails, "response");
    } catch (error: any) {
      console.log(error, "error");
      toast.error(error?.message ?? "Error connecting telegram");
    }
  };
  const tasks = [
    {
      icon: (
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
      ),
      points: "+10",
      label: "Connect X",
      verified: user?.x_id,
      setter: signInwithTwitter,
      desc: "Connect X to your Skyops to get points!",
    },
    {
      image: "/images/icon/telegram.svg",
      points: "+10",
      label: "Connect Telegram",
      verified: user?.tg_id,
      setter: signInwithTeleGram,
      desc: "Connect Telegram to your Skyops to get points!",
    },
    {
      image: "/images/icon/discord.svg",
      points: "+10",
      label: "Connect Discord",
      verified: user?.discord_id,
      setter: signInwithDiscord,
      desc: "Connect Discord to your Skyops to get points!",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 7l8.165 5.715c.661.463.992.695 1.351.784a2 2 0 00.968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C4.28 20 5.12 20 6.8 20z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      points: "+10",
      label: "Connect Email",
      verified: user?.gmail,
      setter: signInwithGoogle,
      desc: "Connect your Email to  Skyops to get points!",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.544 14.544a6.301 6.301 0 10-7.088-7.088M15.6 13.7a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      ),
      points: "+50",
      label: "First 100 USDT Voulme",
      verified: false,
      setter: () => toast.success("Coming Soon"),
      desc: "Earn 50 points when your trading volume first reaches 100 USDT.",
    },
    {
      icon: (
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
      ),
      points: "+10",
      label: "Follow us on X",
      verified: false,
      setter: () => window.open("https://x.com/SkyopsLabs", "_blank"),
      desc: "Follow us on X to earn 10 points",
    },
    {
      image: "/images/icon/telegram.svg",
      points: "+10",
      label: "Join us on Telegram",
      verified: false,
      setter: () => window.open("https://t.me/+k6TpiZ12uHMzNmQ0", "_blank"),
      desc: "Send at least one message in Telegram per day",
    },
    {
      image: "/images/icon/discord.svg",
      points: "+10",
      label: "Join us on Discord",
      verified:
        new Date(new Date().setHours(0, 0, 0, 0)) <
          (user?.lastDiscordMessage ?? 0) &&
        (user?.lastDiscordMessage ?? 0) <
          new Date(new Date().setHours(23, 59, 59, 999)),
      setter: () => window.open("https://discord.gg/PTFgWgBB", "_blank"),
      desc: "Send at least one message in Discord per day",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 14s1.5 2 4 2 4-2 4-2m-1-5h.01M9 9h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-6.5-3a.5.5 0 11-1 0 .5.5 0 011 0zm-6 0a.5.5 0 11-1 0 .5.5 0 011 0z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      points: "+10",
      label: "Refer a friend",
      verified: false,
      setter: copyInviteLink,
    },
    {
      icon: (
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
      ),
      points: "+10",
      label: "Post your opinion",
      verified: false,
      setter: () => "",
      desc: "Post your opinion on X about Skyops",
      input: true,
      placeholder: "Enter a link",
    },
    {
      icon: (
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
      ),
      points: "+10",
      label: "Make a thread on X",
      verified: false,
      setter: () => "",
      desc: "-",
      input: true,
      placeholder: "Enter a link to your thread about us",
    },
  ];

  //------------------------------------------------------------------USE EFFECTS

  useEffect(() => {
    let isMounted = true;

    if (status == "authenticated") {
    }
    const auth = async () => {
      if (!isMounted) return;
      console.log(appSession);
      let message = "";

      try {
        if (appSession) {
          if (appSession?.x_id) {
            message = await authenticateTwitter(
              address as string,
              appSession.x_id,
              appSession.x_username,
            );
          }
          if (appSession?.discord_id) {
            message = await authenticateDiscord(
              address as string,
              appSession.discord_id,
              appSession.discord_username,
            );
          }
          if (appSession?.email) {
            message = await authenticateGmail(
              address as string,
              appSession.email,
            );
          }
        }

        // toast.success(message);
      } catch (error: any) {
        if (isMounted) {
          toast.error(error.message);
        }
      }

      if (isMounted) {
        const userDetails = await getUserDetails(address as string);
        dispatch(setUser(userDetails));
      }
    };

    auth();

    return () => {
      isMounted = false;
    };
  }, [status, address, appSession]);

  useEffect(() => {
    const getAll = async () => {
      const res = await getAllUsers();
      const singleUser = res.find((item) => item.wallet == user.wallet);
      if (singleUser) {
        dispatch(setUserWithRank(singleUser));
      }
    };
    getAll();
  }, [user]);

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("error", error);

    if (error) {
      toast.error(
        error?.includes("CooldownNotMet")
          ? "You can only claim once per week"
          : "An error occured",
        { id: txId as string },
      );
    }
    // console.log("isStatus", isStatus);
    // console.log("error-message", error?.message);
  }, [isLoading, error]);
  useEffect(() => {
    // if (true) {
    //   claimPoints();
    //   toast.success("Transaction confirmed", { id: txId as string });
    // }
  }, [txId, address, user.points, user.wallet]);

  useEffect(() => {
    if (false) {
      toast.error("Transaction not confirmed", { id: txId as string });
    }
  }, [txId]);

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
            <div className="m-5 flex h-[232px] flex-col bg-black  lg:m-2 lg:h-[336px]">
              <div className="flex h-1/2 border-b-[1px] border-white/10 px-4 ">
                <div className="w-1/2 border-r-[1px] border-white/10">
                  <p className="h-1/2 pt-4 text-sm font-medium text-white/[.49]">
                    Total Points
                  </p>
                  <p className="flex h-1/2 items-end pb-4 text-[32px] font-medium leading-none text-white">
                    {`${user?.points ?? 0}`}
                  </p>
                </div>
                <div className="w-1/2 px-4 ">
                  <p className="h-1/2 pt-4 text-sm font-medium text-white/[.49]">
                    Rank
                  </p>
                  <p className="flex h-1/2 items-end pb-4 text-[32px] font-medium leading-none text-white">
                    {userWithRank.rank ? (
                      <>
                        {userWithRank.rank}
                        {/* <span className="mb-[3.8px] text-[18px]">
                          {(() => {
                            const j = userWithRank.rank % 10,
                              k = userWithRank.rank % 100;
                            if (j === 1 && k !== 11) return "st";
                            if (j === 2 && k !== 12) return "nd";
                            if (j === 3 && k !== 13) return "rd";
                            return "th";
                          })()}
                        </span> */}
                      </>
                    ) : (
                      0
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between  p-4 ">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/[.49]">
                    Total SKYOPS
                  </p>
                  <p className="text-sm  text-white underline">What is this?</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-row-reverse items-center  gap-1">
                    <p className="flex items-end  text-[32px] font-medium leading-none text-white">
                      {`${user.points ? user.points / 10 : 0}`}
                    </p>
                    <Image
                      width={18}
                      height={18}
                      alt="icon"
                      className="flex "
                      src={"/images/icon/icon-white.svg"}
                    />
                  </div>
                  <button
                    onClick={handleWriteSmartContract}
                    className="bg-prim2 px-8 py-2 font-medium text-white dark:bg-white dark:text-black"
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt- w-full bg-white pb-8 pt-5 dark:bg-dark-2 lg:mt-5 lg:pt-6">
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
                  Points
                </p>
              </div>
              <div className="max-h-[60vh] overflow-y-scroll">
                {Array.isArray(user.pointsHistory) &&
                  [...user.pointsHistory].reverse().map((item, index) => (
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
            <div className="flex w-full items-center justify-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray dark:bg-dark">
                <Image
                  src={"/images/icon/telegram.svg"}
                  width={20}
                  height={20}
                  alt="tg"
                />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray text-appBlack dark:bg-dark dark:text-white">
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
              </div>
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
                Minning Rewards
              </h6>
              <p className="text-center text-base text-black/[.48] dark:text-white/[.48]">
                Skyops will extract publicly available data from AI model
                training. As a reward, you&apos;ll receive mining points.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-5 border-t-[1px] border-border p-5 lg:my-4 lg:p-0 lg:pt-6">
        <h5 className="mb-4 text-[22px] font-semibold text-appBlack dark:text-white lg:mb-6 lg:px-10">
          Special rewards tasks
        </h5>
        <div className="flex w-full flex-col gap-2 lg:grid lg:grid-cols-4 lg:gap-[11px] lg:px-4">
          {tasks.map((item, index) => {
            return (
              <div
                onClick={item.setter}
                key={index.toString()}
                className={`flex h-[152px] ${item.input ? "" : !item.verified ? "  hover:cursor-pointer hover:rounded-md hover:bg-prim3/20 dark:hover:bg-primary" : ""} w-full flex-col justify-between bg-white  dark:bg-dark-2 ${item.input && "h-[208px] lg:h-[252px]   "} ${item.label.includes("thread") && " lg:col-span-2"} p-5  lg:h-[224px] lg:p-6`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray text-appBlack dark:bg-dark dark:text-white">
                    {item.image ? (
                      <Image
                        src={item.image}
                        width={20}
                        height={20}
                        alt={index.toString()}
                      />
                    ) : (
                      item.icon
                    )}
                  </div>
                  {item.verified ? (
                    <Image
                      src={"/images/icon/tick-circle.svg"}
                      width={24}
                      height={24}
                      alt="good"
                    />
                  ) : (
                    <p className="text-[22px] font-semibold text-black dark:text-white">
                      {item.points}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-medium text-black dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-sm text-black/[.48] dark:text-white/[.48]">
                    {item.desc}
                  </p>
                </div>
                {item.input && (
                  <div className="flex h-[40px] w-full items-center justify-between border-[1px] border-[#E6E6E6] px-[18px] text-black/[.48] dark:border-white/10 dark:text-white/[.80]">
                    <input
                      placeholder={item.placeholder}
                      className="h-full w-full bg-transparent focus:outline-none  dark:text-[#595959]"
                    />
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.877 9H3.752m-.063.219l-1.752 5.23c-.137.412-.206.617-.157.744.043.11.135.193.249.225.13.036.328-.053.724-.23l12.533-5.64c.386-.174.579-.261.638-.382a.375.375 0 000-.332c-.06-.12-.252-.207-.638-.381L2.748 2.81c-.394-.177-.59-.266-.722-.23a.375.375 0 00-.248.225c-.05.126.018.331.154.741L3.69 8.839c.023.07.035.106.04.142a.375.375 0 010 .096c-.005.036-.017.071-.04.142z"
                        stroke="currentColor"
                        strokeOpacity=".28"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default Tasks;
