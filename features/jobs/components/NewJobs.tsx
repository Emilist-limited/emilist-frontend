"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Jobs } from "../types";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";
import { ROUTES } from "@/lib/constants/routes";
import { useGetJobsByStatus } from "../hooks/useGetJobsByStatus";

import CustomPagination from "@/components/molecules/CustomPagination";
import NewJobCard from "./cards/NewJobCard";

const NewJobs = () => {
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
    getAllJobsByStatus("pending");
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
              <h6 className="sm:text-xl whitespace-nowrap">
                {" "}
                No new job listed
              </h6>
              <p className="max-sm:text-xs">
                Keep track of all newly listed jobs here.
              </p>
              <p>
                Want to create a new job?{" "}
                <Link
                  href={ROUTES?.LIST_NEW_JOB}
                  className="text-primary-green"
                >
                  Click here
                </Link>{" "}
              </p>
            </div>
          ) : (
            <>
              {allJobs?.map((job: Jobs) => (
                <NewJobCard job={job} key={job?._id} />
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

export default NewJobs;
