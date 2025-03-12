import Image from "next/image";

const Logo = () => {
  // --------------------------------------------VARIABLES

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div id="logo" className=" flex items-center gap-[8px]  ">
      <div className="relative h-[32px] w-[28.88px] lg:h-[40px] lg:w-[37px]">
        <Image
          src={"/images/logos/logo-white.png"}
          className="hidden dark:flex"
          fill
          alt="logo"
        />
        <Image
          src={"/images/logos/logo-blue.png"}
          className="flex dark:hidden"
          fill
          alt="logo"
        />
      </div>
      <h6 className="text-[16.81px] font-semibold leading-[18.34px] tracking-[-2%] text-prim2 dark:text-white lg:text-[22px] lg:leading-[24px]">
        Skyops
      </h6>
    </div>
  );
};
export default Logo;
