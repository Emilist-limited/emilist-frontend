"use client";

import { useContext } from "react";

import { AnimatePresence, motion } from "framer-motion";

import NavItem from "./NavItem";
import NavLink from "../atoms/NavLink";

import { dropdownVariants } from "@/anim";
import { dashboardMegaMenuItems } from "@/types";
import { AuthContext } from "@/lib/context/AuthState";
import { ServiceProps } from "@/features/services/types";
import { ROUTES } from "@/lib/constants/routes";

interface DropdownMenuProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  links: dashboardMegaMenuItems[];
  services?: boolean;
  icon?: string;
  className?: string;
  underline?: boolean;
}

const DropdownMenu = ({
  label,
  isOpen,
  onToggle,
  links,
  services = false,
  icon,
  underline = true,
  className = "border-b-1",
}: DropdownMenuProps) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`py-2 ${className}`}>
      <NavItem
        label={label}
        onClick={onToggle}
        isOpen={isOpen}
        icon={icon}
        underline={underline}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-2 pl-8 bg-gray-50 py-2"
          >
            {services && (
              <>
                {currentUser?.businesses?.map((service: ServiceProps) => (
                  <li key={service?._id}>
                    <NavLink
                      className="font-light text-primary-orange "
                      href={ROUTES?.DASHBOARD_SERVICE_INFO(service?._id)}
                    >
                      {service?.businessName}
                    </NavLink>
                  </li>
                ))}
              </>
            )}
            {links.map((link, index) => (
              <li key={index}>
                <NavLink href={link.link} className="font-light">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
