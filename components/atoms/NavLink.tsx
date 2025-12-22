"use client";

import Link from "next/link";
import Image from "next/image";

import { useActivePath } from "@/lib/hooks/useActivePath";

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
  hoverEnabled?: boolean;
  icon?: string;
  underline?: boolean;
}

const NavLink = ({
  href,
  children,
  onClick,
  className = "",
  activeClassName = "text-primary-green",
  hoverEnabled = true,
  icon,
  underline = true,
}: NavLinkProps) => {
  const isActive = href ? useActivePath(href) : false;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = `font-medium ${
    isActive ? activeClassName : ""
  } ${className}`;

  const show = underline && href && isActive;
  const hover = underline && href && hoverEnabled;

  return (
    <div className="relative group">
      <div className="flex items-center gap-4 group-hover:text-primary-green transition-all duration-300">
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
        {href ? (
          <Link href={href} className={baseClasses} onClick={handleClick}>
            {children}
          </Link>
        ) : (
          <button className={baseClasses} onClick={handleClick}>
            {children}
          </button>
        )}
      </div>

      {show && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-green max-sm:hidden" />
      )}

      {hover && (
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-green transition-all duration-300 lg:group-hover:w-full max-sm:hidden" />
      )}
    </div>
  );
};

export default NavLink;
