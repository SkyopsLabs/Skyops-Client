"use client";
import React from "react";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  children?: React.ReactNode;
}

const RadioButtonClusterPeriod = () => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const options = [
    "$On Demand",
    "~7 Days",
    "~14 Days",
    "~1 Month",
    "~3 Months",
    "~1 Year",
    "~2 Years",
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

export default RadioButtonClusterPeriod;
