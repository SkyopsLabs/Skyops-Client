"use client";

import RequestAccess from "@/components/common/RequestAccess";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const InstancePage = () => {
  const { address } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRequestInstance = () => {
    if (!address || !reason) toast.error("Warning! Fill the inputs!");
    else {
      toast.success("Success! Request submitted.");
      handleCloseModal();
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <RequestAccess setShowModal={setShowModal} />
      {showModal && (
        <div
          id="modal"
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-11/12 rounded-lg bg-white shadow-lg dark:bg-gray-500 md:w-1/3">
            <div className="flex items-center justify-between p-4">
              <h2 id="modalTitle" className="text-xl font-semibold">
                Join waitlist
              </h2>
              <button
                id="closeModalBtn"
                className="text-xl font-bold text-gray-600 hover:text-gray-800"
                aria-label="Close Modal"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div className="px-4">
              <div className="flex flex-col">
                {/* <div className="mb-3 text-sm font-bold text-gray-600 dark:text-white">
                  Name
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                /> */}
                <div className="my-3 text-sm font-bold text-gray-600 dark:text-white">
                  Wallet
                </div>
                <input
                  type="email"
                  placeholder=""
                  value={address ?? ""}
                  readOnly
                  className="rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <div className="my-3 text-sm font-bold text-gray-600 dark:text-white">
                  Reason
                </div>
                <textarea
                  rows={5}
                  placeholder=""
                  style={{ resize: "none" }}
                  value={reason ?? ""}
                  onChange={(e) => setReason(e.target.value)}
                  className="rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 text-xs font-bold">
              <button
                className="mr-2 w-full rounded bg-gray-200 px-4 py-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                onClick={handleRequestInstance}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstancePage;
