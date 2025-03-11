import React, { useState } from "react";
import Modal from "react-modal";

const ModalComponent = ({
  Content,
  isModalOpen,
  setIsModalOpen,
}: {
  Content: any;
  isModalOpen: boolean;
  setIsModalOpen: (e: boolean) => void;
}) => {
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="modal bord bg-transparent"
      overlayClassName="overlay"
    >
      {Content}
    </Modal>
  );
};

export default ModalComponent;
