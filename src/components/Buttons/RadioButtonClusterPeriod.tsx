'use client'
import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  children?: React.ReactNode;
}

const RadioButtonClusterPeriod = () => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const options = ['$On Demand', '~7 Days', '~14 Days', '~1 Month', '~3 Months', '~1 Year', '~2 Years'];

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

export default RadioButtonClusterPeriod;
