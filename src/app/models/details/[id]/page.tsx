"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAiModelById, topUpTokens } from "@/apis/api-v1";

import { IModel } from "@/types";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";

const MarketplacePage = () => {
  const params = useParams();
  const { id } = params;
  const [model, setModel] = useState<IModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    (async () => {
      const _ = await getAiModelById(String(id));
      setModel(_);
    })();
  }, [id]);

  const handleTopUpTokens = async () => {
    const isSuccess = await topUpTokens(String(id), 1);
    if (isSuccess) toast.success("1M tokens charged");
    else toast.error("Token Charge Error");
  };

  if (!model) {
    return <Loader />;
  }
  return (
    <div
      className="
            flex
            w-full
            flex-col
          "
    >
      <div className="grid   h-auto w-full  grid-cols-1 grid-rows-[64px,64px] items-center border-b border-border  dark:border-dark-3 lg:flex lg:h-[64px] lg:justify-start lg:px-10">
        <button
          onClick={() => router.back()}
          className="flex h-[64px] items-center gap-2 border-b border-border px-5 dark:border-dark-3 lg:hidden"
        >
          <Image
            src={"/images/icon/back.svg"}
            width={24}
            height={24}
            alt="back"
          />
          <p>Back</p>
        </button>
        <h4 className="flex h-[64px] items-center border-b border-border px-5 text-xl font-medium capitalize  text-appBlack dark:border-dark-3 dark:text-white lg:border-none lg:px-0  lg:text-2xl lg:text-[28px]">
          {model.name}
        </h4>
        <div className=" flex h-[64px] items-center px-5 lg:px-0">
          <div className="flex w-max items-center justify-center rounded-[24px] bg-black/10 px-2 py-1 lg:mx-3">
            <p className=" text-xs capitalize text-black/50 dark:text-white/[.48]">
              {model.type}
            </p>
          </div>
          <div className="flex w-max items-center justify-between border-l  border-border dark:border-dark-3">
            <div className="ml-1 px-3 text-base text-appBlack/50 dark:text-white">
              {model.downloads ?? "50"}
            </div>
            <div className="border-l border-border px-3 text-base text-appBlack/50 dark:border-dark-3 dark:text-white">
              Update at{" "}
              {new Date(model.updated_at.toString()).toLocaleDateString()}.
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-prim2 dark:text-white">License</p>
            <Image
              src={"/images/icon/license.svg"}
              width={16}
              height={16}
              alt="license"
            />
          </div>
        </div>
      </div>
      <div className="mx-4 my-6 flex flex-col bg-white p-6 dark:bg-dark-2">
        <h6 className="mb-3 text-lg font-medium text-black dark:text-white">
          About
        </h6>
        <p className="text-black/50 dark:text-white  lg:max-w-[600px]">
          {model ? model.description : "[Model Description]"}
        </p>
        <div className="mt-5 grid w-full grid-cols-2 lg:flex lg:w-auto lg:items-center">
          <button className="col-span-2 mb-5 h-[40px] w-auto bg-prim2 font-medium text-white dark:bg-white dark:text-black lg:mb-0 lg:w-[116px]">
            Top Up
          </button>
          <div className="col-span-1  flex h-[64px] items-center  gap-[6px] border-r border-border dark:border-dark-3 lg:ml-5 lg:w-auto lg:pr-4">
            <p className="text-black/50 dark:text-white/[.48]">Explorer</p>
            <Image
              src={"/images/icon/info.svg"}
              width={16}
              height={16}
              alt="info"
            />
          </div>
          {/* <a
            href={model ? model.link : "#"}
            className="dark:bg-dark-500  col-span-1 flex  items-center justify-center gap-1 lg:ml-4 lg:w-auto"
          >
            <p className="hidden text-black/50 dark:text-white/[.48] lg:flex">
              View on Hugging Face
            </p>
            <p className="flex text-black/50 dark:text-white/[.48] lg:hidden">
              Hugging Face
            </p>
            <Image
              className=""
              src={"/images/icon/license_light.svg"}
              alt="license"
              width={16}
              height={16}
            />
          </a> */}
        </div>
        <div className="flex  w-full border-t border-border2 dark:border-dark-3 lg:mt-6 lg:w-auto  lg:gap-6">
          <div className="flex h-full w-1/2 flex-col  border-r border-border2 py-6 text-black dark:border-dark-3 dark:text-white lg:ml-6 lg:w-auto lg:flex-none lg:flex-grow-0 lg:pr-10">
            <div className="mb-10 font-medium">Inference</div>
            <div className="text-[32px] font-medium">
              ${model?.pricePerInference ?? 0}
            </div>
            <div className="text-xs text-black/50  dark:text-gray-300">
              Per 1M Tokens
            </div>
          </div>
          <div className="flex w-1/2 flex-col p-6 text-black dark:text-white lg:w-auto lg:flex-none">
            <div className="mb-10 font-medium">Fine-Tune</div>
            <div className="text-[32px] font-medium">
              ${model?.pricePerFineTune ?? 0}
            </div>
            <div className="text-xs text-black/50  dark:text-gray-300">
              Per 1M Tokens
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
