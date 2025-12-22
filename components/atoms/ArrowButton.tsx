import { ReactNode } from "react";

interface ArrowButtonProps {
  onClick: () => void;
  icon: ReactNode;
  position: "left" | "right";
  extraStyle: string;
}

const ArrowButton = ({
  onClick,
  icon,
  position,
  extraStyle,
}: ArrowButtonProps) => {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 ${
        position === "left" ? "left-0 " : "right-0 "
      } bg-white opacity-70 hover:opacity-100 transition-all duration-300 shadow-md rounded-full flex items-center justify-center ${extraStyle}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ArrowButton;
