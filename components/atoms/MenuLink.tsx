import Link from "next/link";
import { FC } from "react";

interface MenuLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
const MenuLink: FC<MenuLinkProps> = ({
  href,
  onClick,
  children,
  className = "",
}) => {
  const baseStyles =
    "hover:text-primary-green transition-all duration-300 capitalize cursor-pointer";
  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <p onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </p>
  );
};

export default MenuLink;
