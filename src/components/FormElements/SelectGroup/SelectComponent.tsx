"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ClickOutside from "@/components/ClickOutside";
import { AnimatePresence } from "framer-motion";
import ReactCountryFlag from "react-country-flag";
import { hasFlag } from "country-flag-icons";
import Image from "next/image";

const SelectComponent = ({
  label,
  items,
  placeholder,
  style,
  onChange,
  models,
  error,
  zIndex,
}: {
  items: any[];
  label: string;
  placeholder: string;
  style?: string;
  error?: boolean;
  models?: boolean;
  onChange: (e: any) => void;
  zIndex?: number;
}) => {
  // --------------------------------------------VARIABLES

  const [open, setOpen] = useState(false);
  const [value, setVal] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1); // Track focused option
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter items based on search input and whether they have flags
  const filteredItems = models
    ? items?.filter(
        (item) =>
          hasFlag(item.alpha2) &&
          item.name.toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  //-----------------------------------------------------------FUNCTIONS

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0,
        ); // Move focus down
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1,
        ); // Move focus up
        break;
      case "Enter":
        if (focusedIndex >= 0 && focusedIndex < filteredItems.length) {
          const selectedItem = filteredItems[focusedIndex];
          onChange(selectedItem);
          setVal(selectedItem);
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  //------------------------------------------------------------------USE EFFECTS

  // Focus the search input when the dropdown opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  // Reset focused index when dropdown opens or search changes
  useEffect(() => {
    if (open) {
      setFocusedIndex(-1); // Reset focus when dropdown opens or search changes
    }
  }, [open, search]);

  return (
    <ClickOutside
      onClick={() => {
        setOpen(false);
      }}
    >
      <div className="w-full">
        {label && (
          <label className="text-header_black mb-[10px] block text-sm font-medium">
            {label}
          </label>
        )}
        <div
          onClick={() => {
            setOpen(!open);
            setSearch("");
          }}
          onKeyDown={handleKeyDown} // Add keyboard event handler
          tabIndex={0} // Make the div focusable
          className={`flex  cursor-pointer ${style} h-[50px] w-full border bg-transparent text-sm ${
            error ? "border-error" : "border-border dark:border-dark-3"
          } text-header_black  font-light ${
            open && "border  border-[#FFDD00]"
          } relative  items-center`}
        >
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                style={{ zIndex: zIndex }}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 100, height: 0 }}
                animate={{
                  opacity: 100,
                  height: models ? 408 : items.length > 5 ? 300 : "max-content",
                }}
                exit={{ opacity: 100, height: 0 }}
                transition={{ duration: 0.1, type: "tween" }}
                className="absolute top-[105%]  flex h-max max-h-[408px] w-full flex-col rounded-[4px] bg-gray-5  shadow-[_0px_0px_20px] shadow-black/10 dark:bg-dark-4 "
              >
                {/* Search Input
                {models && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative ml-5 mt-5 flex min-h-[50px] w-[90%]    items-center rounded-[4px] border border-[#EBECE6] bg-[#FAFAFA] px-5 text-sm"
                  >
                    <Image
                      src={"/assets/icons/search-normal.svg"}
                      width={14.45}
                      height={14.45}
                      alt="search"
                      className="absolute left-[10px]"
                    />
                    <input
                      ref={searchInputRef}
                      placeholder="Search country..."
                      onChange={(e) => setSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="placeholder:text-header_black/50 w-full bg-transparent px-[10.55px] placeholder:font-normal focus:outline-none"
                    />
                  </div>
                )} */}

                {/* {models && (
                  <h6 className="text-header_black mb-2 mt-5 px-5 text-sm font-medium">
                    Frequently selected models
                  </h6>
                )} */}
                <div className="z-50 flex h-max flex-col overflow-y-scroll">
                  {filteredItems.map((item, i) => (
                    <button
                      key={i.toString()}
                      style={{ fontSize: 14 }}
                      onClick={() => {
                        if (models) {
                          onChange(item);
                          setVal(item);
                        } else {
                          onChange(item);
                          setVal(item);
                        }
                        setOpen(false);
                      }}
                      className={`regular cursor-pointer ${
                        focusedIndex === i ? "bg-app_yellow/10" : ""
                      } flex items-center gap-[10px] border-b border-border px-5 py-[15px] hover:bg-white/[.48] hover:bg-opacity-[0.08] dark:border-dark-5`}
                    >
                      <Image
                        alt={item.name}
                        width={20}
                        height={14}
                        src={item.image}
                      />
                      <p className="text-sm capitalize text-appBlack/[.48] dark:text-white/[.48]">
                        {item.name.length > 20
                          ? item.name.slice(0, 20).concat("...")
                          : item.name}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!value ? (
            <p
              className={`${!value && "text-black/30 dark:text-white/[.48]"} px-5.5 text-sm`}
            >
              {placeholder}
            </p>
          ) : (
            <div className="flex w-full items-center gap-[10px] pl-[14px]">
              <Image
                alt={value.name}
                width={20}
                height={14}
                src={value.image}
              />
              <p className="text-sm capitalize text-appBlack dark:text-white">
                {value.name.length > 20
                  ? value.name.slice(0, 20).concat("...")
                  : value.name}
              </p>
            </div>
          )}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className={`absolute duration-200 ${
              open ? "z-20 rotate-180" : "rotate-0"
            } right-4 flex  w-max cursor-pointer justify-end self-center  text-appBlack dark:text-white`}
          >
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
          </div>
        </div>
      </div>
    </ClickOutside>
  );
};

export default SelectComponent;
