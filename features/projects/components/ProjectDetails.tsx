import ActiveJobInfo from "@/features/jobs/components/ActiveJobInfo";
import JobInfoHeader from "@/features/jobs/components/JobInfoHeader";
import JobOwnerInfo from "./JobOwnerInfo";

import { Jobs } from "@/features/jobs/types";

const ProjectDetails = ({ jobInfo }: { jobInfo: Jobs }) => {
  return (
    <div className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-6">
      <JobInfoHeader
        status={jobInfo?.status}
        title={jobInfo?.title}
        jobId={jobInfo?._id}
        border_bottom
      />
      <ActiveJobInfo jobInfo={jobInfo} />
      <JobOwnerInfo jobInfo={jobInfo} />
    </div>
  );
};

export default ProjectDetails;
