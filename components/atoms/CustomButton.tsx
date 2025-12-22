import Link from "next/link";

import { ButtonProps } from "@/types";

const CustomButton: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  onClick,
  href,
  loading,
  isAllInputFilled,
  asChild = false,
}) => {
  const isDisabled =
    isAllInputFilled !== undefined &&
    !isAllInputFilled &&
    loading !== undefined;

  const Element = asChild ? "span" : "button";

  const buttonElement = (
    <Element
      {...(!asChild ? { type, onClick } : { onClick })}
      {...(!asChild ? { disabled: isDisabled || loading } : {})}
      className={`custom-btn ${className} ${
        isDisabled || loading
          ? "cursor-not-allowed opacity-65"
          : "hover:bg-green-500 cursor-pointer"
      }`}
    >
      {loading ? <span className="btn-loader" /> : children}
    </Element>
  );

  return href ? <Link href={href}>{buttonElement}</Link> : buttonElement;
};

export default CustomButton;
