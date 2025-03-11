import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  children?: React.ReactNode;
  onClick: (e: string) => void;
}

const ButtonSmall = ({
  label,
  link,
  customClasses,
  children,
  onClick,
}: ButtonPropTypes) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`font-small inline-flex items-center justify-center gap-2.5 text-center text-[14px] hover:bg-opacity-90 ${customClasses}`}
      style={{ padding: "4px", paddingLeft: "20px", paddingRight: "20px" }}
    >
      {children}
      {label}
    </button>
  );
};

export default ButtonSmall;
