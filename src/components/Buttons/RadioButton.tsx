"use client";
import React from "react";

const RadioButton = ({
  setAmount,
}: {
  setAmount: (option: number | null) => void;
}) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const options = ["$25", "$50", "$100"];

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <button
          key={option}
          className={`rounded-md border px-4 py-2 transition-colors duration-200 
                        ${selectedOption === option ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"}`}
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
