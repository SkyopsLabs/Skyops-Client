"use client";
import { IModel } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ISelector {
  models: IModel[] | null;
  handleChangeModel: any;
}

const SelectGroupAIModel = ({ models, handleChangeModel }: ISelector) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="">
      <div className="relative z-20 bg-transparent dark:bg-dark-2">
        <select
          value={selectedOption}
          onChange={(e) => {
            if (e.target.value == "67a4ca18ada9167787056d99") {
              toast.error("Not Available");
              return;
            }
            setSelectedOption(e.target.value);
            handleChangeModel(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none border  border-black/10 bg-transparent px-5.5 py-3 text-black/30 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary ${
            isOptionSelected ? "text-sm text-dark dark:text-white" : ""
          }`}
        >
          <option value="" disabled hidden>
            Choose the Model
          </option>
          {models &&
            models.length > 0 &&
            models.map((model, idx) => (
              <option key={idx} value={model._id} className="text-dark-6">
                {model.name}
              </option>
            ))}
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <Image
            alt="down"
            src={"/images/icon/chevron-down.svg"}
            className={`  duration-200 ease-in`}
            width="24"
            height="24"
          />
        </span>
      </div>
    </div>
  );
};

export default SelectGroupAIModel;
