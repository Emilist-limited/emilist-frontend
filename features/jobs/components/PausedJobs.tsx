"use client";

import { useEffect } from "react";

import { Jobs } from "../types";
import { ROUTES } from "@/lib/constants/routes";
import { useGetJobsByStatus } from "../hooks/useGetJobsByStatus";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";

import CustomPagination from "@/components/molecules/CustomPagination";
import PausedJobCard from "./cards/PausedJobCard";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

const PausedJobs = () => {
  const {
    isLoading,
    allJobs,
    getAllJobsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
    totalJobs,
  } = useGetJobsByStatus();

  useEffect(() => {
    getAllJobsByStatus("paused");
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 pt-10 pb-28">
      {isLoading ? (
        <div className="col-span-2 w-full min-w-full max-md:col-span-3">
          <JobSkeleton className="w-full h-44 min-h-44 py-2" />
        </div>
      ) : (
        <>
          {allJobs?.length < 1 ? (
            <div className="max-w-lg w-full col-span-3">
              <h6 className="sm:text-xl whitespace-nowrap"> No paused job</h6>
              <NoMoreMessage message="Keep track of all paused jobs here." />
            </div>
          ) : (
            <>
              {allJobs?.map((job: Jobs) => (
                <PausedJobCard
                  job={job}
                  key={job?._id}
                  href={
                    job?.type === "biddable"
                      ? ROUTES?.ACTIVE_BIDDABLE_JOB_INFO(job._id)
                      : job?.type === "regular"
                      ? ROUTES?.ACTIVE_REGULAR_JOB_INFO(job._id)
                      : ROUTES?.ACTIVE_DIRECT_JOB_INFO(job._id)
                  }
                />
              ))}
              {totalJobs > 10 && (
                <div className="col-span-2 w-full min-w-full max-md:col-span-3">
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
  );
};

export default PausedJobs;
