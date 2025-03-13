"use client";
import { getAllUsers, getUserByCode } from "@/actions/verify";
import SelectGroup from "@/components/FormElements/SelectGroup/SelectGroup";
import SearchForm from "@/components/Header/SearchForm";
import { ILeaderboard, IUser } from "@/types";
import { getRandomColor, leaderboardPalette } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const LeaderBoard = () => {
  // --------------------------------------------VARIABLES
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<ILeaderboard[]>([]);
  const { address } = useAccount();
  const user = users.find((item) => item.wallet == (address as string));

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  useEffect(() => {
    const getAll = async () => {
      const res = await getAllUsers();
      setUsers(res);
    };
    getAll();
  }, []);

  return (
    <div className="mt-16 flex flex-1 flex-col lg:mt-0">
      <div className="grid w-full grid-cols-2 grid-rows-[64px,64px] items-center justify-end border-b border-border  dark:border-dark-3 lg:flex lg:h-[64px] lg:px-10">
        <h4 className="mr-auto px-5 text-2xl font-medium text-appBlack dark:text-white  lg:px-0 lg:text-[28px]">
          LeaderBoard
        </h4>

        <SelectGroup
          className={"ml-auto w-[135px] lg:ml-0 lg:w-[180px]"}
          options={["By Points", "By Growth"]}
        />
        <SearchForm
          className={
            "col-span-2 flex border-t-[1px] border-border px-5 dark:border-dark-3  lg:hidden"
          }
          search={search}
          placeholder={"Search by address"}
          setSearch={setSearch}
        />
        <SearchForm
          placeholder={"Search by address"}
          className={"hidden lg:flex"}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="grid h-[56px] grid-cols-[1fr,2fr,1fr] px-5 lg:h-[64px] lg:grid-cols-[1.5fr,2fr,2fr,1fr] lg:px-10">
          <p className="flex items-center text-sm text-appBlack/[.48] dark:text-white/[.48]">
            Rank
          </p>
          <p className="flex items-center text-sm text-appBlack/[.48] dark:text-white/[.48]">
            Name
          </p>
          <p className="hidden items-center text-sm text-appBlack/[.48] dark:text-white/[.48] lg:flex">
            Invited By
          </p>
          <p className="flex items-center justify-end text-sm text-appBlack/[.48] dark:text-white/[.48] lg:justify-start">
            Total Points
          </p>
        </div>
        <div className="mb-1.5 grid h-[56px] grid-cols-[1fr,2fr,1fr] bg-appBlack px-5 dark:bg-white/15 lg:h-[64px] lg:grid-cols-[1.5fr,2fr,2fr,1fr] lg:px-10">
          <p className="flex items-center text-sm text-white">
            {user?.rank}(you)
          </p>
          <div className="flex items-center gap-1.5 text-sm text-white">
            <div
              style={{ backgroundColor: getRandomColor() }}
              className="h-6 w-6 rounded-full"
            />
            {user?.wallet?.slice(0, 7)}...
            {user?.wallet?.slice(-6)}
          </div>
          <div className="hidden items-center gap-1.5 text-sm text-white lg:flex">
            <div
              style={{ backgroundColor: getRandomColor() }}
              className="h-6 w-6 rounded-full"
            />
            {user?.referee?.slice(0, 7)}...
            {user?.referee?.slice(-6)}
          </div>
          <p className="flex items-center justify-end text-sm text-white lg:justify-start">
            {user?.points}
          </p>
        </div>
        <div className="max-h-[60vh]   flex-1 overflow-y-scroll lg:max-h-[68vh]">
          {users
            .filter((item) => (search ? item.wallet.includes(search) : true))
            .map((item, index) => (
              <div
                key={index.toString()}
                className="mb-[6px] grid h-[56px] grid-cols-[1fr,2fr,1fr] bg-white px-5 dark:bg-dark-2 lg:h-[64px] lg:grid-cols-[1.5fr,2fr,2fr,1fr] lg:px-10"
              >
                <p className="flex items-center text-sm text-appBlack dark:text-white">
                  {item.rank}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-appBlack dark:text-white">
                  <div
                    style={{ backgroundColor: getRandomColor() }}
                    className="h-6 w-6 rounded-full"
                  />
                  {item?.wallet?.slice(0, 7)}...
                  {item?.wallet?.slice(-6)}
                </div>
                <div className="hidden items-center gap-1.5 text-sm text-appBlack dark:text-white lg:flex">
                  <div
                    style={{ backgroundColor: getRandomColor() }}
                    className="h-6 w-6 rounded-full"
                  />
                  {item?.referee?.slice(0, 7)}...
                  {item?.referee?.slice(-6)}
                </div>
                <p className="flex items-center justify-end text-sm text-appBlack dark:text-white lg:justify-start">
                  {item.points}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default LeaderBoard;
