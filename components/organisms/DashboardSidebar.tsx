import DropdownMenu from "../molecules/DropdownMenu";
import NavLink from "../atoms/NavLink";
import SidebarLayout from "../templates/SidebarLayout";
import LogoutButton from "../atoms/LogoutButton";

import { jobMegaMenuItems } from "@/features/jobs/constants";
import { materialsMegaMenuItems } from "@/features/materials/constants";
import { servicesMegaMenuItems } from "@/features/services/constants";
import { projectsMegaMenuItems } from "@/features/projects/constants";
import { ROUTES } from "@/lib/constants/routes";

interface DashboardSidebarProps {
  toggle: () => void;
  toggleJob: () => void;
  toggleService: () => void;
  toggleMaterial: () => void;
  toggleProject: () => void;
  isJobMegaMenuOpen: boolean;
  isServiceMegaMenuOpen: boolean;
  isMaterialMegaMenuOpen: boolean;
  isProjectMegaMenuOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const DashboardSidebar = ({
  toggle,
  dropdownRef,
  toggleJob,
  toggleMaterial,
  toggleProject,
  toggleService,
  isJobMegaMenuOpen,
  isMaterialMegaMenuOpen,
  isProjectMegaMenuOpen,
  isServiceMegaMenuOpen,
}: DashboardSidebarProps) => {
  return (
    <SidebarLayout toggle={toggle}>
      <div
        className="flex flex-col text-gray-600 pt-12 gap-2"
        ref={dropdownRef}
      >
        <DropdownMenu
          label="Jobs"
          onToggle={toggleJob}
          isOpen={isJobMegaMenuOpen}
          links={jobMegaMenuItems}
        />
        <DropdownMenu
          label="Services"
          onToggle={toggleService}
          isOpen={isServiceMegaMenuOpen}
          links={servicesMegaMenuItems}
          services
        />
        <DropdownMenu
          label="Projects"
          onToggle={toggleProject}
          isOpen={isProjectMegaMenuOpen}
          links={projectsMegaMenuItems}
        />
        <div className="border-b-1 py-2">
          <NavLink href={ROUTES?.PRIVATE_EXPERT}>Private Experts</NavLink>
        </div>
        <div className="border-b-1 py-2">
          <NavLink href={ROUTES?.MESSAGES}>Message</NavLink>
        </div>
        <DropdownMenu
          label="Materials"
          onToggle={toggleMaterial}
          isOpen={isMaterialMegaMenuOpen}
          links={materialsMegaMenuItems}
        />
        <LogoutButton />
      </div>
    </SidebarLayout>
  );
};

export default DashboardSidebar;
