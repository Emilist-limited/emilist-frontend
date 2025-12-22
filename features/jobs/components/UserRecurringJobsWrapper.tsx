"use client";

import { useSaveJob } from "../hooks/useSaveJob";
import { useUnSave } from "../hooks/useUnSave";
import { useGetUserRecurringJobs } from "../hooks/useGetUserRecurringJobs";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import PageLoader from "@/components/atoms/PageLoader";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import JobViewCard from "./JobViewCard";
import CustomPagination from "@/components/molecules/CustomPagination";

const UserRecurringJobsWrapper = () => {
  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading: isUnliking, handleUnsaveJob } = useUnSave();
  const isSubmitting = loading || isUnliking;
  const {
    recurringJobs,
    isLoading,
    handlePageChange,
    totalPages,
    currentPage,
    getRecurringJobs,
    totalJobs,
  } = useGetUserRecurringJobs();

  const onSaveJob = (jobId: string) => {
    handleSaveJob(jobId, () => {
      getRecurringJobs();
    });
  };
  const onUnSaveJob = (jobId: string) => {
    handleUnsaveJob(jobId, () => {
      getRecurringJobs();
    });
  };

  return (
    <div className="padding-ctn sm:py-28 pt-14">
      {" "}
      {isSubmitting && <WhiteBgLoader />}
      <h1 className="sm:text-3xl font-bold text-xl my-4">My Recurring Jobs</h1>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {" "}
          <section className="col-span-2 max-md:col-span-3 space-y-6">
            {!recurringJobs || recurringJobs?.length < 1 ? (
              <NoMoreMessage message="No recurring job listed" />
            ) : (
              <>
                {recurringJobs?.map((job: any) => (
                  <JobViewCard
                    key={job._id}
                    job={job?.jobId}
                    onSaveJob={onSaveJob}
                    onUnSaveJob={onUnSaveJob}
                    shadow
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
      )}{" "}
    </div>
  );
};

export default UserRecurringJobsWrapper;
