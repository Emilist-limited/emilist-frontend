import { JobListProps, Jobs } from "../types";

import ResultMsg from "@/components/atoms/ResultMsg";
import CustomPagination from "@/components/molecules/CustomPagination";
import JobViewCard from "./JobViewCard";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";

import { useSaveJob } from "../hooks/useSaveJob";
import { useUnSave } from "../hooks/useUnSave";
import { useBlacklistJob } from "../hooks/useBlacklistJob";

const JobList = ({
  allJobs,
  totalJobs,
  currentPage,
  totalPages,
  handlePageChange,
  getAllJobs,
}: JobListProps) => {
  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading, handleUnsaveJob } = useUnSave();
  const { handleBlackListJob } = useBlacklistJob();

  const onSaveJob = (jobId: string) => {
    handleSaveJob(jobId, () => {
      getAllJobs();
    });
  };
  const onUnSaveJob = (jobId: string) => {
    handleUnsaveJob(jobId, () => {
      getAllJobs();
    });
  };

  const onBlacklistJob = (jobId: string) => {
    handleBlackListJob(jobId, () => {
      getAllJobs();
    });
  };

  const isSubmitting = loading || isLoading;

  return (
    <div className="col-span-7 lg:pl-6 max-lg:col-span-10">
      {isSubmitting && <WhiteBgLoader />}
      <ResultMsg
        msg={totalJobs > 0 ? `${totalJobs} results found` : "No result found"}
      />
      <div className="flex flex-col gap-5 pb-2 max-w-full">
        {allJobs?.map((job: Jobs) => (
          <JobViewCard
            key={job._id}
            job={job}
            onBlacklistJob={onBlacklistJob}
            onSaveJob={onSaveJob}
            onUnSaveJob={onUnSaveJob}
          />
        ))}
      </div>
      {totalJobs > 10 && (
        <div className="md:w-2/3 w-full pt-2">
          <CustomPagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default JobList;
