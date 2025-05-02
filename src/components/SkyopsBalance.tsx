import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useBalance } from "wagmi";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import { useAppKitAccount } from "@reown/appkit/react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

const TOKEN_MINT = process.env.NEXT_PUBLIC_TOKEN_MINT!; // or your hardcoded mint

const SkyopsBalance = ({ bal = 0 }: { bal?: number }) => {
  // --------------------------------------------VARIABLES
  const { user } = useAppSelector((state) => state.user);
  const { connection } = useAppKitConnection();
  const { isConnected, address } = useAppKitAccount();
  const [balance, setBalance] = useState(0);

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (!isConnected || !address || !connection) return;
      try {
        const mint = new PublicKey(TOKEN_MINT);
        const owner = new PublicKey(address);
        const ata = await getAssociatedTokenAddress(
          mint,
          owner,
          false,
          TOKEN_2022_PROGRAM_ID,
        );
        const accountInfo = await getAccount(
          connection,
          ata,
          undefined,
          TOKEN_2022_PROGRAM_ID,
        );
        // accountInfo.amount is a bigint
        setBalance(Number(accountInfo.amount) / 10 ** 9); // adjust for decimals if needed
      } catch (e) {
        setBalance(0);
        console.error("Error fetching token balance:", e);
      }
    };
    fetchTokenBalance();
  }, [isConnected, address, connection, user.points]);

  return (
    <div className=" flex w-full justify-between lg:h-full  lg:w-max lg:flex-col lg:justify-start">
      <p className="text-sm text-[#01020C7A]/[.48]   dark:text-dark-7">
        SKYOPS Balance
      </p>
      <div className="flex items-center  gap-1">
        <p className="text-[#01020C] dark:text-white">{balance}</p>
        <Image
          width={16}
          height={16}
          alt="icon"
          className="flex dark:hidden"
          src={"/images/icon/icon.svg"}
        />
        <Image
          width={16}
          height={16}
          alt="icon"
          className="hidden dark:flex"
          src={"/images/icon/icon-white.svg"}
        />
      </div>
    </div>
  );
};
export default SkyopsBalance;
