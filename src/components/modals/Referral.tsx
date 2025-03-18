"use client";

import { getUserByCode } from "@/actions/verify";
import { useAppDispatch } from "@/redux/hooks";
import { setCode } from "@/redux/slices/referralSlice";
import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const Referral = ({ close }: { close: (e: boolean) => void }) => {
  // --------------------------------------------VARIABLES
  const [refCode, setRefCode] = useState("");
  const dispatch = useAppDispatch();
  const { open } = useAppKit();

  //-----------------------------------------------------------FUNCTIONS
  const verifyRefCode = async () => {
    const toastId = toast.loading("Verifying");
    try {
      if (refCode.length == 0) {
        toast.error("Enter a code", { id: toastId });
        return;
      }
      const code = await getUserByCode(refCode);
      if (code.includes("Invalid")) {
        toast.error(code, { id: toastId });
        return;
      }
      toast.success("Verified", { id: toastId });
      dispatch(setCode(code));
      close(false);
      open();
    } catch (error: any) {
      toast.error(error.message ?? "An error occured", { id: toastId });
    }
  };

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className="flex h-max w-[335px] flex-col gap-5 rounded-[16px] bg-[#f8f8f8]  p-5 lg:w-[522px] ">
      <div className="flex items-center justify-between">
        <h6 className="w-full text-center text-xl font-medium text-black/[.48]">
          Enter Referral Code
        </h6>
        <button onClick={() => close(false)}>
          <Image
            src={"/images/icon/close.svg"}
            width={12}
            height={12}
            alt="close"
          />
        </button>
      </div>
      <div className="relative flex w-full items-center">
        <input
          onChange={(e) => setRefCode(e.target.value)}
          className="h-[48px] w-full rounded-[16px] bg-white px-5 focus:outline-none focus:ring-[0.5px] focus:ring-primary "
        />
        <button
          className="absolute right-5 h-[30px] w-[79px] rounded-[28px] border-[1px] border-prim2/[.48] bg-prim2/10 text-prim2 duration-100 hover:bg-prim2/5 active:scale-95"
          onClick={verifyRefCode}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
export default Referral;
