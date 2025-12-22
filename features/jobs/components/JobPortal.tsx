import { AnalyticsType } from "../types";
import AboutJobOwner from "./AboutJobOwner";

interface JobPortalProps {
  isJobOwner: boolean;
  jobInfo: any;
  analytics: AnalyticsType;
}

const JobPortal = ({ isJobOwner, jobInfo, analytics }: JobPortalProps) => {
  if (isJobOwner) {
    return null;
  }
  return (
    <div className="flex flex-col gap-6 w-full">
      <AboutJobOwner jobInfo={jobInfo} analytics={analytics} />
    </div>
  );
};

export default JobPortal;
