import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import ProjectSummaryWrapper from "./ProjectSummaryWrapper";
import DashboardNavToggle from "@/components/molecules/DashboardNavToggle";

import { projectLinks } from "../constants";

const ProjectDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen w-full relative">
      <DashboardNavbar />
      <div className="sm:pt-28 pt-24 padding-ctn">
        <ProjectSummaryWrapper />
        <div className="py-6">
          <DashboardNavToggle links={projectLinks} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProjectDashboardLayout;
