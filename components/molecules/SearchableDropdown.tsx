"use client";

import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  setSelectedOption: (option: string) => void;
  selectedOption: string;
  coverage?: boolean;
}

const SearchableDropdown = ({
  selectedOption,
  setSelectedOption,
  options,
}: SearchableDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredCountries = options?.filter((data) =>
    data.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className="min-w-full w-full max-w-full rounded-lg min-h-10 px-2 bg-[#ececec]  focus:outline-none focus-within:border-primary-green focus-within:border-1 flex-c-b z-0"
      >
        <p>{selectedOption ? selectedOption : "Select an option"}</p>
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

      {isOpen && (
        <div className="absolute right-0 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2 overflow-x-hidden">
            <input
              style={{ fontSize: "16px" }}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="max-w-full w-full px-2 h-8 border rounded-md outline-none focus:outline-none  focus:border-primary-green bg-white appearance-none"
            />
          </div>
          <div className="max-h-36 overflow-y-auto">
            <ul role="list" className="py-1 w-full">
              {filteredCountries?.length > 0 ? (
                filteredCountries?.map((option: Option) => (
                  <li key={option.value} className="w-full">
                    <button
                      onClick={() => handleOptionClick(option.value)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    >
                      {option.label}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500">
                  No results found
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
