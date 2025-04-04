import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useBalance } from "wagmi";

const SkyopsBalance = ({ balance = 0 }: { balance?: number }) => {
  // --------------------------------------------VARIABLES
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading, refetch } = useBalance({
    address: user.wallet as `0x${string}`,
    token: "0x616954e0b8949d841630781a12810fF6d2fB0989",
  });

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS
  useEffect(() => {
    if (isError) {
      toast.error("Error fetching balance. Please try again later.");
    }
  }, [isError]);
  useEffect(() => {
    refetch();
  }, [user.points]);

  return (
    <div className=" flex w-full justify-between lg:h-full  lg:w-max lg:flex-col lg:justify-start">
      <p className="text-sm text-[#01020C7A]/[.48]   dark:text-dark-7">
        SKYOPS Balance
      </p>
      <div className="flex items-center  gap-1">
        <p className="text-[#01020C] dark:text-white">
          {data ? parseInt(data?.value.toString() as string) / 10 ** 18 : 0}
        </p>
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
