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
    <div className="p-2">
      <div className="flex w-full flex-1 flex-col rounded-[10px] border border-stroke bg-white p-2 px-7 py-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <h3 className="my-5 text-body-2xlg font-bold text-dark dark:text-white">
          Account setting
        </h3>

        <h3 className="font-large font-bold text-dark dark:text-white">
          Profile
        </h3>
        {/* Profile part */}
        <div className="my-5 flex flex-col border-t sm:flex-row">
          <div className="flex">
            <div className="mr-5 w-full sm:w-full">
              <label
                className="my-3 block text-body-sm font-medium text-dark dark:text-white"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="name"
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="mr-5 w-full sm:w-full">
              <label
                className="my-3 block text-body-sm font-medium text-dark dark:text-white"
                htmlFor="email"
              >
                Wallet Address
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="email"
                  placeholder=""
                  defaultValue={
                    user && user.wallet
                      ? shortenAddress(user.wallet, 5)
                      : "User address"
                  }
                  disabled
                />
              </div>
            </div>

            <div className="mr-5 w-full sm:w-full">
              <label
                className="my-3 block text-body-sm font-medium text-dark dark:text-white"
                htmlFor="joined_date"
              >
                Joined Date
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="joined_date"
                  placeholder=""
                  defaultValue={
                    user ? convertDateToString(user.created_at) : "Joined Date"
                  }
                  disabled
                />
              </div>
            </div>
          </div>

          <div
            className={`mx-2 mt-12 flex h-fit cursor-pointer items-center justify-center rounded-[5px] bg-[#0000FE] px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10`}
            onClick={handleUpdateProfile}
          >
            Save
          </div>
        </div>

        {/* Password */}
        <h3 className="font-large font-bold text-dark dark:text-white">
          Password
        </h3>
        <div className="my-5 flex border-t"></div>
        <ButtonDefault
          label="Change Password"
          link="#"
          customClasses="bg-blue-400 text-white rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10 mx-2 h-10 w-70 cursor-not-allowed"
        />
        <p className="mx-2 my-3 text-base dark:text-white">
          {
            "If you log in with third party auth provider, you can't change password here."
          }
        </p>
      </div>
    </div>
  );
};

export default SettingsAccountPage;
