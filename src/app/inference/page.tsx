"use client";

import RequestAccess from "@/components/common/RequestAccess";
import WaitlistModal from "@/components/modals/WaitlistModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const AIExplorerTextPage = () => {
  const { address } = useAccount();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRequestInference = (reason: string) => {
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
          className="fixed inset-0 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <WaitlistModal
            close={handleCloseModal}
            submit={handleRequestInference}
          />
        </div>
      )}
    </div>
  );
};

export default AIExplorerTextPage;
