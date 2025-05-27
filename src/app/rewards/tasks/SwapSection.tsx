import React, { useState, useEffect } from "react";
import { deductPoints, addPoints, getUserDetails } from "@/actions/verify";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { useAppKitAccount } from "@reown/appkit/react";
import { useWriteContract } from "wagmi";
import { ABI } from "@/utils/helpers";
import { Wallet } from "ethers";
import toast from "react-hot-toast";

const iSKYOPS_CA = process.env.NEXT_PUBLIC_ISKYOPS_CA as `0x${string}`;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

const wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY as string);

const SwapSection = () => {
  const { address } = useAppKitAccount();
  const { writeContractAsync } = useWriteContract();
  const dispatch = useDispatch();
  const [swapDirection, setSwapDirection] = useState<
    "iSKYOPS_TO_SKYOPS" | "SKYOPS_TO_iSKYOPS"
  >("iSKYOPS_TO_SKYOPS");
  const [amount, setAmount] = useState("");
  const [pendingSwap, setPendingSwap] = useState<null | {
    direction: string;
    value: number;
  }>(null);
  const { user, balance } = useAppSelector((state) => state.user);
  const iSKYOPSBalance = user?.tokens ?? 0;
  const SKYOPSBalance = balance;

  // wagmi hooks for tx status
  const [txHash, setTxHash] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  // You must pass useWaitForTransactionReceipt and useWriteContract from parent, or import and use here
  // For this example, we assume writeContractAsync returns a tx hash
  const { useWaitForTransactionReceipt } = require("wagmi");
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
    error: txError,
  } = useWaitForTransactionReceipt({ hash: txHash });

  // Helper: Only allow numbers, and check for over-balance
  const parsedAmount = Number(amount);
  const isOverBalance =
    swapDirection === "iSKYOPS_TO_SKYOPS"
      ? parsedAmount > iSKYOPSBalance
      : parsedAmount > SKYOPSBalance;
  const inputError =
    amount !== "" && (isNaN(parsedAmount) || parsedAmount < 0 || isOverBalance);

  // Handle swap click
  const handleSwap = async () => {
    if (!address) {
      toast.error("Connect your wallet to swap");
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      if (swapDirection === "iSKYOPS_TO_SKYOPS") {
        // Call claimRewards, then deduct points in DB after tx confirmed
        const points = Number(amount);
        if (points > iSKYOPSBalance) {
          toast.error("Insufficient iSKYOPS");
          setLoading(false);
          return;
        }
        // Prepare EIP-712 signature
        const messageParams = {
          types: {
            ExtensionClientData: [
              { name: "client", type: "address" },
              { name: "points", type: "uint256" },
              { name: "server", type: "address" },
            ],
          },
          domain: {
            name: "skyopslabs.ai",
            version: "2",
            chainId: 1, // Mainnet
            verifyingContract: iSKYOPS_CA,
          },
          messages: {
            client: address,
            points: points,
            server: iSKYOPS_CA,
          },
        };
        const raw = await wallet.signTypedData(
          messageParams.domain,
          messageParams.types,
          messageParams.messages,
        );
        const tx = await writeContractAsync({
          address: iSKYOPS_CA,
          abi: ABI,
          functionName: "claimRewards",
          args: [
            {
              client: address,
              points: points,
              server: iSKYOPS_CA,
              signature: raw,
            },
          ],
        });
        setTxHash(tx);
        setPendingSwap({ direction: "iSKYOPS_TO_SKYOPS", value: points * 0.4 });
      } else {
        // SKYOPS to iSKYOPS: transfer SKYOPS to rewards contract address, then add points after tx confirmed
        const skyopsAmount = Number(amount);
        if (skyopsAmount > SKYOPSBalance) {
          toast.error("Insufficient SKYOPS");
          setLoading(false);
          return;
        }
        if (!address) {
          toast.error("Connect your wallet to swap");
          setLoading(false);
          return;
        }
        try {
          const abi = [
            {
              inputs: [
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              name: "transfer",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "nonpayable",
              type: "function",
            },
          ];
          const tx = await writeContractAsync({
            address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`,
            abi: abi,
            functionName: "transfer",
            args: [iSKYOPS_CA, BigInt(Math.floor(skyopsAmount * 1e18))],
          });
          setTxHash(tx);
          setPendingSwap({
            direction: "SKYOPS_TO_iSKYOPS",
            value: skyopsAmount,
          });
        } catch (err: any) {
          toast.error("Token transfer failed: " + (err?.message || ""));
          setLoading(false);
          return;
        }
      }
    } catch (err: any) {
      console.error(err.message, "Error");

      const match = err.message?.match(/reverted: ([^\n]*)/i);

      const revertReason = match ? match[1].trim() : "An error Occurred";

      toast.error(revertReason || "An error occurred during the swap");
      // toast.error("Swap failed");
      setLoading(false);
    }
  };

  // Effect: handle DB update after tx is confirmed
  useEffect(() => {
    let attempts = 0;
    const doDbUpdate = async () => {
      if (!pendingSwap || !address) return;
      setLoading(true);
      if (pendingSwap.direction === "iSKYOPS_TO_SKYOPS") {
        // Retry logic for deductPoints
        while (attempts < MAX_RETRIES) {
          try {
            const res = await deductPoints(
              address,
              pendingSwap.value,
              "Swap",
              true,
            );
            if (res.error) {
              toast.error(res.message ?? "Error deducting points");
              attempts++;
              if (attempts < MAX_RETRIES) {
                await new Promise((r) =>
                  setTimeout(r, RETRY_DELAY_MS * attempts),
                );
              } else {
                toast.error("Failed to deduct points after retries.");
              }
            } else {
              toast.success("Swap successful! Claimed SKYOPS.");
              // Optionally update user state if dispatch is provided
              const userDetails = await getUserDetails(address);
              dispatch(setUser(userDetails));
              setAmount("");
              break;
            }
          } catch (err: any) {
            toast.error("DB error: " + (err?.message || ""));
            attempts++;
            if (attempts < MAX_RETRIES) {
              await new Promise((r) =>
                setTimeout(r, RETRY_DELAY_MS * attempts),
              );
            } else {
              toast.error("Failed to deduct points after retries.");
            }
          }
        }
      } else if (pendingSwap.direction === "SKYOPS_TO_iSKYOPS") {
        // Retry logic for addPoints
        while (attempts < MAX_RETRIES) {
          try {
            const res = await addPoints(
              address,
              pendingSwap.value,
              "Swap",
              true,
            );
            if (res.error) {
              toast.error(res.message ?? "Error adding points");
              attempts++;
              if (attempts < MAX_RETRIES) {
                await new Promise((r) =>
                  setTimeout(r, RETRY_DELAY_MS * attempts),
                );
              } else {
                toast.error("Failed to add points after retries.");
              }
            } else {
              toast.success(
                "Transferred SKYOPS to rewards contract. iSKYOPS credited.",
              );
              const userDetails = await getUserDetails(address);
              dispatch(setUser(userDetails));
              break;
            }
          } catch (err: any) {
            toast.error("Points DB update failed: " + (err?.message || ""));
            attempts++;
            if (attempts < MAX_RETRIES) {
              await new Promise((r) =>
                setTimeout(r, RETRY_DELAY_MS * attempts),
              );
            } else {
              toast.error("Failed to add points after retries.");
            }
          }
        }
      }
      setLoading(false);
      setPendingSwap(null);
      setTxHash(undefined);
    };
    if (isConfirmed && pendingSwap) {
      doDbUpdate();
    }
    if (isError && pendingSwap) {
      toast.error("Transaction not confirmed");
      setLoading(false);
      setPendingSwap(null);
      setTxHash(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, isError]);

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

  // Modern Uniswap-like UI
  return (
    <div className="mx-auto w-full rounded-2xl border-[#23263B]  p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Swap</h2>
      </div>
      {/* From Input */}
      <div className="mb-3 rounded-xl bg-dark-2 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-[#A3A9BA]">From</span>
          <span className="text-xs text-[#A3A9BA]">
            Balance:{" "}
            {swapDirection === "iSKYOPS_TO_SKYOPS"
              ? iSKYOPSBalance
              : SKYOPSBalance.toFixed(2)}
          </span>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            pattern="^[0-9]*[.,]?[0-9]*$"
            value={amount}
            onChange={(e) => {
              // Only allow valid numbers, block strings and block if over balance
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) {
                const num = Number(val);
                const over =
                  swapDirection === "iSKYOPS_TO_SKYOPS"
                    ? num > iSKYOPSBalance
                    : num > SKYOPSBalance;
                if (!over) {
                  setAmount(val);
                }
              }
            }}
            className={`min-w-0 flex-1 border-none bg-transparent text-2xl font-semibold outline-none ${inputError ? "text-red-500 placeholder-red-400" : "text-white"}`}
            placeholder={swapDirection === "iSKYOPS_TO_SKYOPS" ? "0.0" : "0.0"}
            disabled={loading}
            autoComplete="off"
          />
          <button
            className="whitespace-nowrap rounded bg-dark-2 px-2 py-1 text-xs text-[#A3A9BA] hover:bg-dark-2/80"
            onClick={() =>
              setAmount(
                swapDirection === "iSKYOPS_TO_SKYOPS"
                  ? iSKYOPSBalance.toString()
                  : SKYOPSBalance.toFixed(2),
              )
            }
            type="button"
            disabled={loading}
          >
            Max
          </button>
          <div className="flex max-w-[90px] items-center gap-1 rounded-full bg-dark-2 px-2 py-1">
            <Image
              src={
                swapDirection === "iSKYOPS_TO_SKYOPS"
                  ? "/images/icon/icon-white.svg"
                  : "/images/icon/icon-white.svg"
              }
              width={18}
              height={18}
              alt="token"
              style={{ minWidth: 18 }}
            />
            <span className="text-xs font-bold text-white md:text-sm">
              {swapDirection === "iSKYOPS_TO_SKYOPS" ? "iSKYOPS" : "SKYOPS"}
            </span>
          </div>
        </div>
      </div>
      {/* Arrow */}
      <div className="my-2 flex justify-center">
        <button
          onClick={() =>
            setSwapDirection(
              swapDirection === "iSKYOPS_TO_SKYOPS"
                ? "SKYOPS_TO_iSKYOPS"
                : "iSKYOPS_TO_SKYOPS",
            )
          }
          disabled={loading}
          className="rounded-full border-4 border-[#181A20] bg-dark-2 p-2"
          aria-label="Toggle swap direction"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            style={{
              transform:
                swapDirection === "iSKYOPS_TO_SKYOPS"
                  ? "rotate(0deg)"
                  : "rotate(180deg)",
              transition: "transform 0.2s",
            }}
          >
            <path
              d="M12 5v14m0 0l-5-5m5 5l5-5"
              stroke="#A3A9BA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {/* To Output */}
      <div className="mb-4 mt-3 rounded-xl bg-dark-2 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-[#A3A9BA]">To</span>
          <span className="text-xs text-[#A3A9BA]">
            Balance:{" "}
            {swapDirection === "iSKYOPS_TO_SKYOPS"
              ? SKYOPSBalance.toFixed(2)
              : iSKYOPSBalance}
          </span>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <input
            type="text"
            value={
              swapDirection === "iSKYOPS_TO_SKYOPS"
                ? amount
                  ? (Number(amount) * 1).toFixed(2)
                  : ""
                : amount
                  ? (Number(amount) / 1).toFixed(2)
                  : ""
            }
            readOnly
            className={`min-w-0 flex-1 border-none bg-transparent text-2xl font-semibold outline-none ${inputError ? "text-red-500 placeholder-red-400" : "text-white"}`}
            placeholder="0.0"
          />
          <div className="flex max-w-[90px] items-center gap-1 rounded-full bg-dark-2 px-2 py-1">
            <Image
              src={
                swapDirection === "iSKYOPS_TO_SKYOPS"
                  ? "/images/icon/icon-white.svg"
                  : "/images/icon/icon-white.svg"
              }
              width={18}
              height={18}
              alt="token"
              style={{ minWidth: 18 }}
            />
            <span className="text-xs font-bold text-white md:text-sm">
              {swapDirection === "iSKYOPS_TO_SKYOPS" ? "SKYOPS" : "iSKYOPS"}
            </span>
          </div>
        </div>
        {inputError && (
          <div className="mt-1 text-xs text-red-500">
            Amount exceeds available balance or is invalid.
          </div>
        )}
      </div>
      <button
        className={`w-full rounded-xl py-3 text-lg font-bold transition ${inputError || !amount || loading || !address ? "cursor-not-allowed bg-gray-500 text-white opacity-60" : "bg-prim2 text-white hover:bg-prim2/90"}`}
        onClick={handleSwap}
        disabled={inputError || !amount || loading || !address}
      >
        {!address
          ? "Connect Wallet to Swap"
          : loading
            ? "Processing..."
            : swapDirection === "iSKYOPS_TO_SKYOPS"
              ? "Swap to SKYOPS"
              : "Swap to iSKYOPS"}
      </button>
    </div>
  );
};

export default SwapSection;
