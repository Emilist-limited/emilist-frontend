"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useNavbarScroll } from "@/lib/hooks/useNavbarScroll";

import Logo from "../atoms/Logo";
import DesktopNav from "../molecules/DesktopNav";
import MobileNav from "../molecules/MobileNav";

interface NavbarProps {
  toggle: () => void;
}

const Navbar = ({ toggle }: NavbarProps) => {
  const { currentUser } = useContext(AuthContext);
  const { visible, isHeightGreaterThanScreen } = useNavbarScroll();

  return (
    <header className="w-full">
      <div
        className={`fixed w-full backdrop-blur-xl transition-transform duration-700 z-10 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${isHeightGreaterThanScreen && "shadow"}`}
      >
        <div className="padding-ctn  h-[10vh] flex-c-b relative">
          <Logo />
          <DesktopNav isAuthenticated={!!currentUser} />
          <MobileNav toggle={toggle} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
