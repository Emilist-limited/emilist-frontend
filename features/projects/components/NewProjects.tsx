"use client";

import { Jobs } from "@/features/jobs/types";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";
import { useGetProjectByStatus } from "../hooks/useGetProjectByStatus";

import NewJobCard from "@/features/jobs/components/cards/NewJobCard";
import CustomPagination from "@/components/molecules/CustomPagination";

const NewProjects = () => {
  const {
    isLoading,
    allProjects,
    handlePageChange,
    totalPages,
    currentPage,
    totalProject,
  } = useGetProjectByStatus("pending");

  return (
    <div className="grid grid-cols-3 gap-5 pt-10 pb-28">
      {isLoading ? (
        <div className="col-span-2 w-full min-w-full max-md:col-span-3">
          <JobSkeleton className="w-full h-44 min-h-44 py-2" />
        </div>
      ) : (
        <>
          {allProjects?.length < 1 ? (
            <div className="max-w-lg w-full">
              <h6 className="sm:text-xl whitespace-nowrap">
                {" "}
                No new project listed
              </h6>
              <p className="max-sm:text-xs">
                Keep track of all newly listed projects here.
              </p>
            </div>
          ) : (
            <>
              {allProjects?.map((job: Jobs) => (
                <NewJobCard job={job} key={job?._id} />
              ))}
              {totalProject > 10 && (
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

export default NewProjects;
