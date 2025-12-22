"use client";

import { Jobs } from "../types";
import { useSaveJob } from "../hooks/useSaveJob";
import { useUnSave } from "../hooks/useUnSave";
import { useGetUserSavedJobs } from "../hooks/useGetUserSavedJobs";

import CustomPagination from "@/components/molecules/CustomPagination";
import JobViewCard from "./JobViewCard";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import PageLoader from "@/components/atoms/PageLoader";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";

const UserSavedJobsWrapper = () => {
  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading: isUnliking, handleUnsaveJob } = useUnSave();
  const {
    totalJobs,
    isLoading,
    allUserSavedJobs,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedJobs,
  } = useGetUserSavedJobs();

  const onSaveJob = (jobId: string) => {
    handleSaveJob(jobId, () => {
      getAllUserSavedJobs();
    });
  };
  const onUnSaveJob = (jobId: string) => {
    handleUnsaveJob(jobId, () => {
      getAllUserSavedJobs();
    });
  };

  const isSubmitting = loading || isUnliking;
  return (
    <div className="padding-ctn sm:py-28 pt-14">
      {isSubmitting && <WhiteBgLoader />}
      <h1 className="sm:text-3xl font-bold text-xl my-4">Saved Jobs</h1>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-3 gap-10">
          <section className="col-span-2 max-md:col-span-3 space-y-6">
            {allUserSavedJobs?.length < 1 ? (
              <NoMoreMessage message="No saved job found" />
            ) : (
              <>
                {allUserSavedJobs?.map((job: Jobs) => (
                  <JobViewCard
                    key={job._id}
                    job={job}
                    onSaveJob={onSaveJob}
                    onUnSaveJob={onUnSaveJob}
                    shadow
                    autoLike
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
          </section>
        </div>
      )}
    </div>
  );
};

export default UserSavedJobsWrapper;
