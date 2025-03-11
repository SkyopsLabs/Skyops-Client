"use client";
import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  children?: React.ReactNode;
}

const RadioButtonClusterDeliveryTime = () => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const options = [
    "Next 7 Days",
    "ASAP",
    "In 3 Months",
    "Next 3~12 Months",
    "Next 14 Days",
    "In 2 Months",
    "In 1 Month",
  ];

  return (
    <div className="flex flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          className={`m-1 w-max rounded-[28px] border px-4 py-2 text-sm text-black/50 transition-colors duration-200 lg:px-5
                      ${selectedOption === option ? "border-prim2/50 bg-prim2/10" : "border-black/10 bg-white"}`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonClusterDeliveryTime;
