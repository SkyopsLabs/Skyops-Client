"use client";
import { useAppKitAccount } from "@reown/appkit/react";
import { useState } from "react";

const WaitlistModal = ({
  close,
  submit,
}: {
  close: () => void;
  submit: (e: string) => void;
}) => {
  // --------------------------------------------VARIABLES
  const { address } = useAppKitAccount();
  const [reason, setReason] = useState<string | null>(null);

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className="w-11/12 rounded-lg bg-white p-5 md:w-1/3  lg:p-6">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-appBlack lg:text-2xl">
          Join waitlist
        </h2>
        <button
          id="closeModalBtn"
          className=" text-2xl font-bold text-appBlack hover:text-gray-800 lg:text-3xl"
          aria-label="Close Modal"
          onClick={close}
        >
          &times;
        </button>
      </div>

      <div className="px-4">
        <div className="flex flex-col">
          <div className="my-2 text-sm font-bold text-appBlack/[.9] ">
            Wallet
          </div>
          <input
            type="email"
            disabled
            placeholder=""
            value={address ?? ""}
            readOnly
            className="rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-3 text-dark outline-none transition  disabled:cursor-default disabled:bg-gray-2"
          />
          <div className="my-2 mt-5 text-sm font-bold text-appBlack/[.9] lg:mt-6 ">
            Reason
          </div>
          <textarea
            rows={5}
            placeholder=""
            style={{ resize: "none" }}
            value={reason ?? ""}
            onChange={(e) => setReason(e.target.value)}
            className="rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between p-4 text-xs font-bold lg:mt-6">
        <button
          className="mr-2 h-[40px] w-full rounded bg-gray-200 px-4 py-2 lg:h-[56px]"
          onClick={close}
        >
          Cancel
        </button>
        <button
          className="h-[40px] w-full rounded bg-prim2 px-4 py-2 text-white lg:h-[56px]"
          onClick={() => submit(reason as string)}
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default WaitlistModal;
