"use client";

import { useEffect, useState } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";

import { useApp } from "@/components/Layouts/AppProvider";
import { convertDateToString, shortenAddress } from "@/utils/collection-v1";
import { updateProfile } from "@/apis/api-v1";

const SettingsAccountPage = () => {
  const { user, refetchUserData } = useApp();

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user && user.username) {
      console.log("Rendering...");
      setUsername(user.username);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!username) return;
    await updateProfile(username);
    refetchUserData();
  };

  return (
    <div className="w-full">
      <div className="flex h-[64px] items-center justify-between border-b border-border px-5 dark:border-white/10 lg:px-10">
        <h4 className="text-2xl font-medium text-appBlack  dark:text-white lg:text-[28px]">
          Account Settings
        </h4>
      </div>
      <div className="mb-4 bg-white p-5 dark:bg-dark-2  lg:mx-4 lg:mb-3 lg:mt-6 lg:p-6">
        {/* General Part */}
        <h3 className="mb-4 text-[20px] font-medium text-appBlack  dark:text-white lg:mb-6 lg:text-[22px]">
          Profile
        </h3>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
          {/* Organization ID */}
          <input
            className=" h-[60px]  w-full  border-[1px] border-black/10 bg-white px-4.5 py-2.5 text-black/30 focus:border-primary focus-visible:outline-none  dark:border-white/10 dark:bg-dark-2   dark:text-white/[.48] dark:focus:border-primary lg:w-1/3"
            type="text"
            name="name"
            placeholder=""
            defaultValue={"Name"}
            disabled
          />

          {/* Organization Name */}

          <input
            className=" h-[60px] w-full   border-[1px] border-black/10 bg-white px-4.5 py-2.5 text-appBlack focus:border-primary focus-visible:outline-none  dark:border-white/10 dark:bg-dark-2   dark:text-white/[.48] dark:focus:border-primary lg:w-1/3"
            type="text"
            name="address"
            placeholder=""
            defaultValue={"0x8A7...73766"}
            disabled
          />

          {/* Create Time */}

          <input
            className=" h-[60px] w-full   border-[1px] border-black/10 bg-white px-4.5 py-2.5 text-appBlack focus:border-primary focus-visible:outline-none  dark:border-white/10 dark:bg-dark-2   dark:text-white/[.48] dark:focus:border-primary lg:w-1/3"
            type="text"
            name="joined"
            placeholder=""
            defaultValue={"2025-02-28"}
            disabled
          />
        </div>
      </div>
      {/* Password */}
      <div className="mb-4 bg-white p-5 dark:bg-dark-2  lg:mx-4 lg:mb-3 lg:mt-6 lg:p-6">
        <h3 className="mb-4 text-[20px] font-medium text-appBlack  dark:text-white lg:mb-3 lg:text-[22px]">
          Password
        </h3>
        <p className="text-black/50 dark:text-white/[.48]">
          If yu log in with third party auth provider, you can&apos;t change
          password here.
        </p>
      </div>
    </div>
  );
};

export default SettingsAccountPage;
