import Image from "next/image";

const SkyopsBalance = ({ balance = 0 }: { balance?: number }) => {
  // --------------------------------------------VARIABLES

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className=" flex w-full justify-between lg:h-full  lg:w-max lg:flex-col lg:justify-start">
      <p className="text-sm text-[#01020C7A]  opacity-50 dark:text-dark-6">
        SKYOPS Balance
      </p>
      <div className="flex items-center  gap-1">
        <p className="text-[#01020C] dark:text-dark-6">{balance}</p>
        <Image
          width={16}
          height={16}
          alt="icon"
          src={"/images/icon/icon.svg"}
        />
      </div>
    </div>
  );
};
export default SkyopsBalance;
