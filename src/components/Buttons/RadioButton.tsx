"use client";
import React from "react";

const RadioButton = ({
  setAmount,
}: {
  setAmount: (option: number | null) => void;
}) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const options = ["$25", "$50", "$100", "$200", "$500"];

  return (
    <div className="flex items-center gap-2 ">
      {options.map((option) => (
        <button
          key={option}
          className={`rounded-[11px] border-[1px] border-black/10 px-4 py-2 text-black/[.48] transition-colors duration-200 
                        ${selectedOption === option ? "border-blue-500 bg-blue-100 text-prim3" : "border-gray-300 bg-white"}`}
          onClick={() => {
            setSelectedOption(option);
            setAmount(Number(option.replace("$", "")));
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default RadioButton;
