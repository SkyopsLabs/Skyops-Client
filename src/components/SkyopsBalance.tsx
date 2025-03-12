import Image from "next/image";

const SkyopsBalance = ({ balance = 0 }: { balance?: number }) => {
  // --------------------------------------------VARIABLES

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className=" flex w-full justify-between lg:h-full  lg:w-max lg:flex-col lg:justify-start">
      <p className="text-sm text-[#01020C7A]/[.48]   dark:text-dark-7">
        SKYOPS Balance
      </p>
      <div className="flex items-center  gap-1">
        <p className="text-[#01020C] dark:text-white">{balance}</p>
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
