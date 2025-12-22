"use client";

import dynamic from "next/dynamic";

import { AnimatePresence } from "framer-motion";

import DynamicNav from "../molecules/DynamicNav";
import DashboardNavLinks from "../molecules/DashboardNavLinks";
import DashboardNavIcons from "../molecules/DashboardNavIcons";

import { useNavbarStates } from "@/lib/hooks/useNavbarStates";

const DashboardSidebar = dynamic(() => import("./DashboardSidebar"));

const DashboardNavbar = ({
  showNavLinks = true,
}: {
  showNavLinks?: boolean;
}) => {
  const {
    handleJobDropDown,
    handleMaterialDropDown,
    handleNotificationDropdown,
    handleProfileDropdown,
    handleProjectDropDown,
    handleServiceDropDown,
    toggle,
    openJobDropdown,
    openMaterialDropdown,
    openNotification,
    openProfile,
    openProjectsDropdown,
    openServiceDropdown,
    openSideBar,
    megaMenuRef,
  } = useNavbarStates();

  return (
    <>
      <DynamicNav bg>
        <div
          className="flex-1 flex items-center justify-end gap-16"
          ref={megaMenuRef}
        >
          {showNavLinks && (
            <DashboardNavLinks
              toggleJob={handleJobDropDown}
              toggleService={handleServiceDropDown}
              toggleMaterial={handleMaterialDropDown}
              toggleProject={handleProjectDropDown}
              isProjectMegaMenuOpen={openProjectsDropdown}
              isJobMegaMenuOpen={openJobDropdown}
              isServiceMegaMenuOpen={openServiceDropdown}
              isMaterialMegaMenuOpen={openMaterialDropdown}
            />
          )}
          <DashboardNavIcons
            toggle={toggle}
            handleNotificationDropdown={handleNotificationDropdown}
            handleProfileDropdown={handleProfileDropdown}
            openNotification={openNotification}
            openProfile={openProfile}
          />
        </div>
      </DynamicNav>
      <AnimatePresence>
        {openSideBar && (
          <DashboardSidebar
            toggle={toggle}
            toggleJob={handleJobDropDown}
            toggleService={handleServiceDropDown}
            toggleMaterial={handleMaterialDropDown}
            toggleProject={handleProjectDropDown}
            isProjectMegaMenuOpen={openProjectsDropdown}
            isJobMegaMenuOpen={openJobDropdown}
            isServiceMegaMenuOpen={openServiceDropdown}
            isMaterialMegaMenuOpen={openMaterialDropdown}
            dropdownRef={megaMenuRef}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardNavbar;
