import { AnimatePresence } from "framer-motion";

import NavItem from "./NavItem";
import MegaMenu from "../organisms/MegaMenu";
import NavLink from "../atoms/NavLink";
import DashboardMegaMenuContent from "./DashboardMegaMenuContent";

import { ROUTES } from "@/lib/constants/routes";
import { jobMegaMenuItems } from "@/features/jobs/constants";
import { servicesMegaMenuItems } from "@/features/services/constants";
import { projectsMegaMenuItems } from "@/features/projects/constants";
import { materialsMegaMenuItems } from "@/features/materials/constants";

interface DashboardNavLinksProps {
  toggleJob: () => void;
  toggleService: () => void;
  toggleMaterial: () => void;
  toggleProject: () => void;
  isJobMegaMenuOpen: boolean;
  isServiceMegaMenuOpen: boolean;
  isMaterialMegaMenuOpen: boolean;
  isProjectMegaMenuOpen: boolean;
}

const DashboardNavLinks = ({
  toggleJob,
  toggleMaterial,
  toggleService,
  toggleProject,
  isJobMegaMenuOpen,
  isMaterialMegaMenuOpen,
  isServiceMegaMenuOpen,
  isProjectMegaMenuOpen,
}: DashboardNavLinksProps) => {
  return (
    <nav className="xl:flex items-center space-x-8 hidden">
      <div>
        <NavItem label="Job" onClick={toggleJob} isOpen={isJobMegaMenuOpen} />
        <AnimatePresence>
          {isJobMegaMenuOpen && (
            <MegaMenu>
              <DashboardMegaMenuContent megaMenuItems={jobMegaMenuItems} />
            </MegaMenu>
          )}
        </AnimatePresence>
      </div>
      <div>
        <NavItem
          label="Service"
          onClick={toggleService}
          isOpen={isServiceMegaMenuOpen}
        />
        <AnimatePresence>
          {isServiceMegaMenuOpen && (
            <MegaMenu>
              <DashboardMegaMenuContent
                megaMenuItems={servicesMegaMenuItems}
                services
                showMobileApp
              />
            </MegaMenu>
          )}
        </AnimatePresence>
      </div>
      <div>
        <NavItem
          label="Projects"
          onClick={toggleProject}
          isOpen={isProjectMegaMenuOpen}
        />
        <AnimatePresence>
          {isProjectMegaMenuOpen && (
            <MegaMenu>
              <DashboardMegaMenuContent
                megaMenuItems={projectsMegaMenuItems}
                showMobileApp
              />
            </MegaMenu>
          )}
        </AnimatePresence>
      </div>
      <NavLink href={ROUTES?.PRIVATE_EXPERT}>Private Experts</NavLink>
      <div>
        <NavItem
          label="Materials"
          onClick={toggleMaterial}
          isOpen={isMaterialMegaMenuOpen}
        />
        <AnimatePresence>
          {isMaterialMegaMenuOpen && (
            <MegaMenu>
              <DashboardMegaMenuContent
                megaMenuItems={materialsMegaMenuItems}
                showMobileApp
              />
            </MegaMenu>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default DashboardNavLinks;
