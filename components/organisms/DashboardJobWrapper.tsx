"use client";

import { ROUTES } from "@/lib/constants/routes";
import { useFetchJobs } from "@/features/jobs/hooks/useFetchJobs";
import { Jobs } from "@/features/jobs/types";
import { useSaveJob } from "@/features/jobs/hooks/useSaveJob";
import { useUnSave } from "@/features/jobs/hooks/useUnSave";
import { useBlacklistJob } from "@/features/jobs/hooks/useBlacklistJob";
import { JobSkeleton } from "../molecules/skeletonLoaders/JobSkeleton";

import DashboardToggleSearchNavWrapper from "./DashboardToggleSearchNavWrapper";
import JobViewCard from "@/features/jobs/components/JobViewCard";
import CustomPagination from "../molecules/CustomPagination";
import WhiteBgLoader from "../atoms/WhiteBgLoader";
import NoMoreMessage from "../atoms/NoMoreMessage";

const DashboardJobWrapper = () => {
  const {
    allJobs,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    totalJobs,
    currentPage,
    getAllJobs,
    isFetching,
    setIsFetching,
  } = useFetchJobs();

  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading: isUnliking, handleUnsaveJob } = useUnSave();
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

  const isSubmitting = loading || isUnliking;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await getAllJobs();
  };

  return (
    <div className="col-span-7 max-lg:col-span-10 w-full">
      {isSubmitting && <WhiteBgLoader />}
      <DashboardToggleSearchNavWrapper
        link={ROUTES?.LIST_NEW_JOB}
        linkTitle="Post New Job"
        description="Search for jobs, view all available job listings, save jobs for quick access later, and blacklist jobs you're not interested in."
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="flex flex-col overflow-y-auto hide-scrollbar max-w-full overflow-x-hidden pb-6 bg-white rounded-b-lg px-1">
        {isFetching ? (
          <JobSkeleton className="w-full h-56 min-h-56 p-2" />
        ) : (
          <>
            {allJobs?.length < 1 ? (
              <div className="p-6">
                <NoMoreMessage
                  message={
                    search
                      ? "No result found, try searching for something else"
                      : "No job listed"
                  }
                />
              </div>
            ) : (
              <>
                {allJobs?.map((job: Jobs) => (
                  <JobViewCard
                    key={job._id}
                    job={job}
                    onBlacklistJob={onBlacklistJob}
                    onSaveJob={onSaveJob}
                    onUnSaveJob={onUnSaveJob}
                    shadow={false}
                  />
                ))}
                {totalJobs > 10 && (
                  <div className="md:w-2/3 w-full pt-2">
                    <CustomPagination
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardJobWrapper;
