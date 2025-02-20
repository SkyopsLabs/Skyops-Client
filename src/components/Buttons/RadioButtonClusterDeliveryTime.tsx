'use client'
import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  children?: React.ReactNode;
}

const RadioButtonClusterDeliveryTime = () => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const options = ['Next 7 Days', 'ASAP', 'In 3 Months', 'Next 3~12 Months', 'Next 14 Days', 'In 2 Months', 'In 1 Month'];

  return (
    <div className="grid grid-cols-2">
      {options.map(option => (
        <button
          key={option}
          className={`py-2 border rounded-md transition-colors duration-200 m-2 font-bold
                        ${selectedOption === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonClusterDeliveryTime;
