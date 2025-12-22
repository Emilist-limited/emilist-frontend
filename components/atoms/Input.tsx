import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  bg?: string;
}

const Input = ({ className, bg = "bg-[#ececec] ", ...props }: InputProps) => (
  <input
    className={`min-w-full w-full max-w-full rounded-lg px-2 appearance-none outline-none h-10 focus:outline-none focus:border-primary-green focus:border-1 ${bg} ${className}`}
    style={{ fontSize: "16px" }}
    {...props}
  />
);

export default Input;
