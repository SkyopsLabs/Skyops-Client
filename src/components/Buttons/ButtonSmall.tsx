import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  children?: React.ReactNode;
}

const ButtonSmall = ({
  label,
  link,
  customClasses,
  children,
}: ButtonPropTypes) => {
  return (
    <>
      <Link
        className={`inline-flex items-center justify-center gap-2.5 text-center font-small hover:bg-opacity-90 text-[14px] ${customClasses}`}
        style={{ padding: '4px', paddingLeft: '20px', paddingRight: '20px' }}
        href={link}
      >
        {children}
        {label}
      </Link>
    </>
  );
};

export default ButtonSmall;
