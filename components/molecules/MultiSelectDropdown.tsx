"use client";

import { useEffect, useRef, useState } from "react";

interface MultiSelectDropdownProps {
  options: string[];
  placeholder?: string;
  customPlaceholder?: string;
  setSelectedOptions: (selected: string[]) => void;
  selectedOptions: string[];
}

const MultiSelectDropdown = ({
  selectedOptions,
  setSelectedOptions,
  options,
  placeholder,
  customPlaceholder,
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [customOption, setCustomOption] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSelectedOptions = selectedOptions?.filter((options: string) => {
    return options !== "Others";
  });

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions?.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAddCustomOption = () => {
    if (customOption.trim() !== "") {
      setSelectedOptions([...selectedOptions, customOption]);
      setCustomOption("");
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className="min-w-full w-full max-w-full rounded-lg min-h-10 px-2 bg-[#ececec]  focus:outline-none focus-within:border-primary-green focus-within:border-1 flex-c-b"
      >
        <div className="flex gap-2 items-center flex-wrap">
          {filteredSelectedOptions?.length > 0 ? (
            filteredSelectedOptions?.map((option) => (
              <p key={option} className="flex-c gap-1 max-sm:text-sm">
                {option}{" "}
                <span className="" onClick={() => toggleOption(option)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
              </p>
            ))
          ) : (
            <p className="text-sm">{placeholder}</p>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 w-full mt-1 origin-top-right bg-white border border-gray-200 z-10 rounded-md shadow-lg">
          <div className="py-1">
            <ul role="list" className=" w-full max-h-44 overflow-y-auto ">
              {options.map((option: string, index: number) => (
                <li key={index} className="w-full">
                  <button
                    onClick={() => {
                      toggleOption(option);
                      if (option !== "Others") {
                        setOpen(false);
                      } else {
                        setOpen(true);
                      }
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>

            {/* Show input when "Others" is selected */}
            {selectedOptions.includes("Others") && (
              <div className="flex-c gap-2 px-2">
                <input
                  type="text"
                  value={customOption}
                  onChange={(e) => setCustomOption(e.target.value)}
                  placeholder={customPlaceholder}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-primary-green bg-white text-sm"
                  style={{ fontSize: "16px" }}
                />
                <button
                  onClick={handleAddCustomOption}
                  className="bg-primary-green text-white px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
