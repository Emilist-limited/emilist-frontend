"use client";

import Image from "next/image";
import ArrowDownIcon from "../atoms/ArrowDownIcon";

import { NavItemProps } from "@/types";

const NavItem = ({
  label,
  onClick,
  isOpen,
  icon,
  underline = true,
}: NavItemProps) => {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className="flex items-center space-x-4 w-full font-medium"
        aria-expanded={isOpen}
        aria-controls="mega-menu"
      >
        {icon && (
          <span>
            <Image
              src={icon}
              width={14}
              height={14}
              alt="home-icon"
              className="w-5 h-5 object-contain"
            />
          </span>
        )}
        <span className="flex items-center space-x-1 group-hover:text-primary-green transition-all duration-300">
          {" "}
          <span>{label}</span>
          <ArrowDownIcon
            className={`w-4 h-4 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {underline && (
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-green transition-all duration-300 group-hover:w-full max-sm:hidden" />
      )}
    </div>
  );
};

export default NavItem;
