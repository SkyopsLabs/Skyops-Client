// src/app/page.tsx

import Login from "@/components/Login";
import React from "react";
import Image from "next/image";
import splash from "../../public/images/blue_room.jpg";

export default function Home() {
  return (
    <div className="bord relative flex h-screen w-full items-center justify-center bg-[#B2BA6] ">
      {/* <div className="absolute top-[18vh] h-[95vw] w-[100vw] sm:top-1/2 sm:-translate-y-1/2 lg:h-[48vw] lg:w-[55vw]"> */}
      <Image
        src={"/images/background_sky.png"}
        alt="Logo"
        fill
        className="absolute object-cover"
      />
      {/* </div> */}
      {/* <div className="absolute bottom-[18vh] h-[95vw] w-[100vw] sm:bottom-1/2  sm:translate-y-1/2 sm:opacity-50  lg:h-[48vw] lg:w-[55vw]">
        <Image src={splash} alt="Logo" fill className="" />
      </div> */}
      <div className="bord bg-prim">
        <div className="relative flex items-center justify-center rounded-[16px]   bg-[#ffffff] p-10  xsm:p-12">
          <div className="absolute z-10 flex h-full w-full items-center justify-center rounded-[16px]   bg-[#ffffff] p-10  xsm:p-12" />
          <div className="absolute  h-full w-full rounded-[16px] bg-[#646E68]/50 blur-3xl" />
          <Login />
        </div>
      </div>
    </div>
  );
}
