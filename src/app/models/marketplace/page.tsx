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

const MarketplacePage = () => {
  const [models, setModels] = useState<IModel[] | null>(null);
  const [search, setSearch] = useState<string>("");

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
            h-full
            w-full
            rounded-[10px]
            bg-white
            shadow-1
            dark:bg-gray-dark
            dark:shadow-card
          "
    >
      <div className="flex flex-col">
        <div className="m-5 mb-0">
          <SearchForm search={search} setSearch={setSearch} />
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="my-3 ml-2 sm:ml-5">
            <ButtonSmall
              label="All"
              link="#"
              customClasses="bg-[#0000FE] text-white rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10 mr-5 my-3"
            />
            <ButtonSmall
              label="Text"
              link="#"
              customClasses="text-dark dark:text-white rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10 bg-gray-200 dark:bg-gray-500 my-3"
            />
          </div>
          <div className="my-3 ml-2 sm:ml-3">
            <ButtonSmall
              label="All"
              link="#"
              customClasses="bg-[#0000FE] text-white dark:text-dark rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10 dark:bg-gray-500 mx-1 sm:mx-2 my-3"
            />
            <ButtonSmall
              label="Meta"
              link="#"
              customClasses="text-dark dark:text-white bg-gray-200 rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10 dark:bg-gray-500 mx-1 sm:mx-2 my-3"
            />
            <ButtonSmall
              label="Mistral"
              link="#"
              customClasses="text-dark dark:text-white bg-gray-200 rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10 dark:bg-gray-500 mx-1 sm:mx-2 my-3"
            />
            <ButtonSmall
              label="Google"
              link="#"
              customClasses="text-dark dark:text-white bg-gray-200 rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10 dark:bg-gray-500 mx-1 sm:mx-2 my-3"
            />
          </div>
          <div className="w-xl ml-2 sm:m-5">
            <SelectGroup />
          </div>
        </div>

        <div className="grid p-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
                  className="ease mx-3 transform transition-transform duration-300 hover:-translate-y-[5px]"
                  key={index.toString()}
                >
                  <div className="my-5 flex w-full flex-col rounded-[10px] bg-gray-200 p-2 shadow-2 dark:bg-gray-400">
                    <div className="flex gap-2 py-2">
                      <div className="relative  h-[48px] w-[48px]">
                        <Image
                          className="object-contain"
                          src={model.image}
                          fill
                          alt="Logo"
                        />
                      </div>
                      <div className="flex  flex-col gap-1 dark:text-white">
                        <p className="text-large font-bold">{model.name}</p>
                        <div className="flex items-center justify-start">
                          <p className=" bg-gray-4 px-1 text-sm font-medium">
                            {model.type}
                          </p>
                          {/* <p className="mx-1 bg-gray-4 px-1 text-sm font-medium">
                            Meta
                          </p> */}
                        </div>
                      </div>
                    </div>

                    <p className="mx-2 line-clamp-2 text-xs text-dark dark:text-white">
                      {model.description}
                    </p>

                    <div className="flex items-center justify-between p-2">
                      <div className="text-xs text-dark dark:text-white">
                        {model.downloads}
                      </div>
                      <div className="text-xs text-dark dark:text-white">
                        Update at{" "}
                        {new Date(
                          model.updated_at.toString(),
                        ).toLocaleDateString()}
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
