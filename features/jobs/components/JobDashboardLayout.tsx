import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import JobSummaryWrapper from "./JobSummaryWrapper";
import DashboardNavToggle from "@/components/molecules/DashboardNavToggle";

import { JobLinks } from "../constants";

const JobDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative">
      <DashboardNavbar />
      <div className="sm:pt-28 pt-24 padding-ctn">
        <JobSummaryWrapper />
        <div className="py-6 no-scroll">
          <DashboardNavToggle links={JobLinks} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default JobDashboardLayout;
