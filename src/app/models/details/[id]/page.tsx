"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAiModelById, topUpTokens } from "@/apis/api-v1";

import { IModel } from "@/types";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";

const MarketplacePage = () => {
  const params = useParams();
  const { id } = params;
  const [model, setModel] = useState<IModel | null>(null);

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
            rounded-[10px]
            bg-white
            p-5
            shadow-1 dark:bg-gray-dark dark:shadow-card
          "
    >
      <Link
        href="/models/marketplace"
        className="text-dark-200 p-1 text-xs font-bold dark:text-white"
      >
        {"< back"}
      </Link>
      <div className="flex items-center justify-between border-b">
        <div className="flex gap-2 py-2">
          <Image
            className="object-contain"
            src={model?.image ?? "/images/icon/meta.svg"}
            alt="Logo"
            width={50}
            height={32}
          />
          <div className=" flex flex-col dark:text-white">
            <p className="text-large font-bold">
              {model ? model.name : "[Model Name]"}
            </p>
            <div className="flex items-center justify-start">
              <p className="mr-1  bg-gray-4 px-1 text-xs font-medium">
                {model ? model.type : "[Model Type]"}
              </p>
              {/* <p className="mx-1 bg-gray-4 px-1 text-xs font-medium">
                    Meta
                  </p> */}
              <p>|</p>
              <p className="mx-2 text-xs">{model ? model.downloads : 0}</p>
              <p className="mx-2 text-xs">
                Update{" "}
                {model
                  ? new Date(model.updated_at.toString()).toLocaleDateString()
                  : "[Model is updated at]"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div
            className="text-dark-300 mx-3 cursor-pointer rounded-[5px] border-2 px-3 py-2 text-sm font-bold duration-200 hover:bg-primary hover:text-white"
            onClick={handleTopUpTokens}
          >
            Top Up
          </div>
          <Link
            className="text-dark-300 mx-3 rounded-[5px] border-2 px-3 py-2 text-sm font-bold"
            href="/ai-explorer/text"
          >
            Explorer
          </Link>
        </div>
      </div>

      <div className="flex">
        <p className="text-dark-200 dark:text-500 my-4 text-xs">License</p>
        <a
          href="#"
          className="mx-4 my-4 text-xs font-bold text-primary underline"
        >
          {model ? model.name : "[Model Name]"}
        </a>
      </div>
      <p className="text-dark-200 my-2 text-sm font-bold dark:text-white">
        {model ? model.description : "[Model Description]"}
      </p>
      <div className="mt-5 flex">
        <a
          href={model ? model.link : "#"}
          className="bg-dark-100 dark:bg-dark-500 flex rounded-[5px] border-2 border-primary px-3 py-3 text-sm text-primary"
        >
          <p className="my-1">View on Hugging Face</p>
          <Image
            className="my-1 ml-2"
            src={"/images/models/link.png"}
            alt="Logo"
            width={18}
            height={7}
          />
        </a>
      </div>
      <div className="mt-5 flex gap-6">
        <div className="mr-3 flex flex-col text-black dark:text-white">
          <div className="text-xs font-bold">Inference</div>
          <div className="text-2xl font-bold">
            ${model?.pricePerInference ?? 0}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Per 1M Tokens
          </div>
        </div>
        <div className="mx-3 flex flex-col text-black dark:text-white">
          <div className="text-xs font-bold">Fine-Tune</div>
          <div className="text-2xl font-bold">
            ${model?.pricePerFineTune ?? 0}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Per 1M Tokens
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
