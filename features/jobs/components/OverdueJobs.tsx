"use client";

import { useEffect } from "react";

import { Jobs } from "../types";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";
import { useGetJobsByStatus } from "../hooks/useGetJobsByStatus";

import CustomPagination from "@/components/molecules/CustomPagination";
import OverdueJobCard from "./cards/OverdueJobCard";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import { ROUTES } from "@/lib/constants/routes";

const OverdueJobs = () => {
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
    getAllJobsByStatus("overdue");
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 pt-10 pb-28">
      {" "}
      {isLoading ? (
        <div className="col-span-2 w-full min-w-full max-md:col-span-3">
          <JobSkeleton className="w-full h-44 min-h-44 py-2" />
        </div>
      ) : (
        <>
          {!allJobs || allJobs?.length < 1 ? (
            <div className="w-full max-w-lg  col-span-3">
              <h6 className="sm:text-xl  whitespace-nowrap"> No overdue job</h6>
              <NoMoreMessage message="Keep track of all overdue jobs here." />
            </div>
          ) : (
            <>
              {allJobs?.map((job: Jobs) => (
                <OverdueJobCard
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

export default OverdueJobs;
