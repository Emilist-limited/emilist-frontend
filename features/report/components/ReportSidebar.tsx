"use client";

import NavLink from "@/components/atoms/NavLink";
import DropdownMenu from "@/components/molecules/DropdownMenu";
import UserInfo from "./UserInfo";

import { jobMegaMenuItems } from "@/features/jobs/constants";
import { materialsMegaMenuItems } from "@/features/materials/constants";
import { projectsMegaMenuItems } from "@/features/projects/constants";
import { servicesMegaMenuItems } from "@/features/services/constants";
import { ROUTES } from "@/lib/constants/routes";
import { useNavbarStates } from "@/lib/hooks/useNavbarStates";

const ReportSidebar = () => {
  const {
    handleJobDropDown,
    handleMaterialDropDown,
    handleProjectDropDown,
    handleServiceDropDown,
    openJobDropdown,
    openMaterialDropdown,
    openProjectsDropdown,
    openServiceDropdown,
  } = useNavbarStates();

  return (
    <div className="fixed bg-white w-72 max-xl:hidden z-10 h-screen py-28">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col text-gray-600 pt-12 gap-2 px-10 py-3">
          <DropdownMenu
            label="Jobs"
            icon="/icons/bag-tick-2.svg"
            onToggle={handleJobDropDown}
            isOpen={openJobDropdown}
            links={jobMegaMenuItems}
            className=""
            underline={false}
          />
          <DropdownMenu
            label="Services"
            icon="/icons/driver.svg"
            onToggle={handleServiceDropDown}
            isOpen={openServiceDropdown}
            links={servicesMegaMenuItems}
            className=""
            services
            underline={false}
          />
          <DropdownMenu
            label="Projects"
            onToggle={handleProjectDropDown}
            isOpen={openProjectsDropdown}
            links={projectsMegaMenuItems}
            className=""
            icon="/icons/layer 2.svg"
            underline={false}
          />
          <div className="py-2">
            <NavLink
              href={ROUTES?.PRIVATE_EXPERT}
              icon="/icons/user-octagon.svg"
              underline={false}
            >
              Private Experts
            </NavLink>
          </div>
          <DropdownMenu
            label="Materials"
            onToggle={handleMaterialDropDown}
            isOpen={openMaterialDropdown}
            links={materialsMegaMenuItems}
            icon="/icons/broom.svg"
            className=""
            underline={false}
          />
          <div className="py-2">
            <NavLink
              href={ROUTES?.REPORTS}
              icon="/icons/document-text.svg"
              underline={false}
            >
              Reports
            </NavLink>
          </div>
        </div>
        <UserInfo />
      </div>
    </div>
  );
};

export default ReportSidebar;
