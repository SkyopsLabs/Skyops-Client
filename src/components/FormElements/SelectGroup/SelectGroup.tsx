"use client";
import Image from "next/image";
import React, { useState } from "react";

const SelectGroup = ({
  options,
  className,
}: {
  options: string[];
  className: string;
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div
      className={`border-border ${className} relative z-50 h-full border-l bg-transparent dark:border-dark-3 `}
    >
      <select
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          changeTextColor();
        }}
        className={`relative z-20 h-full w-full appearance-none bg-transparent px-5.5 py-2.5 outline-none transition focus:border-primary active:border-primary dark:border-dark-3  dark:focus:border-primary ${
          isOptionSelected ? "text-appBlack dark:text-white" : ""
        }`}
      >
        {options.map((item) => (
          <option key={item} value={item} className="text-appBlack">
            {item}
          </option>
        ))}
      </select>

      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-appBlack  dark:text-white">
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 10l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default SelectGroup;
