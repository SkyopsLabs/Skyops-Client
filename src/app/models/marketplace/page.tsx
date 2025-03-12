"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import SearchForm from "@/components/Header/SearchForm";
import SelectGroup from "@/components/FormElements/SelectGroup/SelectGroup";
import ButtonSmall from "@/components/Buttons/ButtonSmall";

import { IModel } from "@/types";

import { getAiModels } from "@/apis/api-v1";
import Loader from "@/components/common/Loader";

const buttonLabels = ["All", "Mistral", "Meta", "Google"];

const MarketplacePage = () => {
  const [models, setModels] = useState<IModel[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [llm, SetLlm] = useState<string>("All");

  useEffect(() => {
    (async () => {
      const _ = await getAiModels();
      setModels(_);
    })();
  }, []);

  if (!models) {
    return <Loader />;
  }
  return (
    <div
      className="
            mt-16
            h-full
            w-full
            lg:mt-0
          "
    >
      <div className="grid w-full grid-cols-2 grid-rows-[64px,64px] items-center justify-end border-b border-border px-5 dark:border-dark-3 lg:flex lg:h-[64px] lg:px-10">
        <h4 className="mr-auto text-2xl font-medium text-appBlack  dark:text-white lg:text-[28px]">
          Marketplace
        </h4>

        <SelectGroup
          className={"ml-auto w-[116px] lg:ml-0 lg:w-[90px]"}
          options={["All", "Text"]}
        />
        <SearchForm
          className={"flex lg:hidden"}
          search={search}
          setSearch={setSearch}
        />
        <SelectGroup
          className={"ml-auto w-[116px] lg:ml-0 lg:w-[180px]"}
          options={["Latest", "Popularity"]}
        />
        <SearchForm
          className={"hidden lg:flex"}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="flex flex-col">
        <div className="mx-5 my-6 w-max lg:mx-10">
          {buttonLabels.map((label, index) => (
            <ButtonSmall
              key={index}
              label={label}
              onClick={SetLlm}
              link="#"
              customClasses={`${llm == label ? "bg-prim3 dark:bg-white dark:text-black text-white" : "dark:text-white/50 dark:bg-transparent"}  border border-black/40 dark:border-white/10 rounded-[28px] px-4 py-1  mr-1 lg:mr-2`}
            />
          ))}
        </div>
        <div className="grid w-full gap-3 px-4 lg:grid-cols-2">
          {models &&
            models.length > 0 &&
            models
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((model, index) => (
                <Link
                  prefetch={true}
                  href={`details/${model._id}`}
                  className="ease  transform transition-transform duration-300 hover:-translate-y-[5px]"
                  key={index.toString()}
                >
                  <div className="flex w-full   flex-col  rounded-[10px] bg-white p-5  dark:bg-dark-2 lg:p-6">
                    <div className="flex items-center justify-between border-b border-[#F8F8F8] pb-[18px]  dark:border-dark-3">
                      <div className="flex  flex-col gap-1 dark:text-white">
                        <p className=" max-w-[187px]  text-lg font-medium capitalize text-black dark:text-white lg:max-w-max">
                          {model.name}
                        </p>
                        <div className="flex w-max items-center justify-center rounded-[24px] bg-black/10 px-2 py-1 dark:bg-white/10">
                          <p className=" text-xs capitalize text-black/50 dark:text-white/[.48] ">
                            {model.type}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex h-[40px] w-[40px] items-center justify-center  rounded-full bg-[#F8F8F8]">
                        <Image
                          className="object-contain"
                          width={22}
                          height={16}
                          src={model.image}
                          alt="Logo"
                        />
                      </div>
                    </div>

                    <p className="mt-[18px] text-sm leading-[22px] text-black/50 dark:text-white/50">
                      {model.description.slice(0, 250).concat("...")}
                    </p>

                    <div className="mt-4 flex w-max  items-center justify-between">
                      <div className="text-xs text-dark dark:text-white/80">
                        Update at{" "}
                        {new Date(
                          model.updated_at.toString(),
                        ).toLocaleDateString()}
                        .
                      </div>
                      <div className="ml-1 text-xs text-dark dark:text-white/80">
                        {model.downloads ?? "50"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
