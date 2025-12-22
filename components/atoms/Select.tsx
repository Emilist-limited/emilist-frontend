import { optionsType } from "@/types";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: optionsType[];
  placeholder?: string;
  containerClassName?: string;
}

const Select = ({
  options,
  placeholder,
  className = "",
  containerClassName = "",
  ...props
}: SelectProps) => {
  return (
    <div
      className={`min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1 ${containerClassName}`}
    >
      <select
        style={{ fontSize: "16px" }}
        className={`bg-[#ececec] outline-none min-w-full w-full h-full max-w-full ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder || "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
