"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";
import ArrowDownIcon from "../atoms/ArrowDownIcon";

const MenuItems = dynamic(() => import("../organisms/MenuItems"));
const Sidebar = dynamic(() => import("../organisms/Sidebar"));

const MainNav = () => {
  const [menu, setMenu] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggle = () => {
    setOpenSideBar((prev) => !prev);
    setMenu(false);
  };

  const toggleMenu = () => {
    setMenu((prev) => !prev);
    setOpenSideBar(false);
  };

  return (
    <div>
      <Navbar toggle={toggle} />
      <div className=" h-[10vh]" />
      <div className="">
        <div className="relative border-t-1 pt-1 w-full lg:hidden gap-2">
          <button
            className="padding-ctn flex items-center gap-1"
            onClick={toggleMenu}
          >
            Explore Emilist
            <ArrowDownIcon
              className={`w-4 h-4 transform transition-transform duration-200 ${
                menu ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {menu && <MenuItems setMenu={setMenu} />}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {openSideBar && <Sidebar toggle={toggle} />}
      </AnimatePresence>
    </div>
  );
};

export default MainNav;
