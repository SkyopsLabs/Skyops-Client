"use client";
import Image from "next/image";
import React from "react";

const RequestAccess = ({
  setShowModal,
}: {
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}) => {
  return (
    <div className="justify-content-center flex flex-col items-center gap-4 text-center">
      <div className="relative h-[65px] w-[55px]">
        <Image
          src={"/images/logos/logo-white.png"}
          alt="Logo"
          className="hidden object-contain dark:block"
          fill
        />
        <Image
          fill
          src={"/images/logos/logo-grey.png"}
          alt="Logo"
          className="object-contain dark:hidden"
        />
      </div>
      <p className="text-bold max-w-3xl text-base">
        {
          "Exciting things are on the way! We're working on new features and want to give early access to those who are interested. If Instances sound like something you'd like to explore, sign up for the waitlist. We'll keep you informed and let you know the moment it's ready. Appreciate your enthusiasm!"
        }
      </p>

      <button
        className="mt-2 rounded-[5px] bg-[#0000FE]  px-10 py-2 text-white duration-200 hover:bg-opacity-65 lg:px-8 xl:px-10"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Request Access
      </button>
    </div>
  );
};

export default RequestAccess;
