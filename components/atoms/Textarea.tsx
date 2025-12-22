import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = ({ className = "", ...props }: TextareaProps) => {
  return (
    <textarea
      style={{ fontSize: "16px" }}
      className={`min-w-full w-full max-w-full rounded-lg p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 ${className}`}
      {...props}
    ></textarea>
  );
};

export default Textarea;
