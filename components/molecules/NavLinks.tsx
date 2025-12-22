import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { ROUTES } from "@/lib/constants/routes";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

import NavLink from "../atoms/NavLink";
import NavItem from "./NavItem";
import MegaMenu from "../organisms/MegaMenu";
import ExploreEmilistMegaMenuContent from "../organisms/ExploreEmilistMegaMenuContent";

interface NavLinksProps {
  isAuthenticated: boolean;
}

const NavLinks = ({ isAuthenticated }: NavLinksProps) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useOutsideClick(() => setIsMegaMenuOpen(false));

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center space-x-6">
      <NavLink href={ROUTES.JOIN_EXPERT}>Join as Expert</NavLink>
      <NavLink href={ROUTES.LIST_NEW_JOB}>List New Job</NavLink>
      <div ref={megaMenuRef}>
        <NavItem
          label="Explore Emilist"
          onClick={toggleMegaMenu}
          isOpen={isMegaMenuOpen}
        />
        <AnimatePresence>
          {isMegaMenuOpen && (
            <MegaMenu>
              <ExploreEmilistMegaMenuContent />
            </MegaMenu>
          )}
        </AnimatePresence>
      </div>
      {isAuthenticated ? (
        <NavLink href={ROUTES.DASHBOARD_JOB}>Dashboard</NavLink>
      ) : (
        <>
          <NavLink href={ROUTES.LOGIN}>Login</NavLink>
          <NavLink href={ROUTES.SIGN_UP}>Sign up</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavLinks;
