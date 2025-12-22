"use client";

import { Jobs } from "@/features/jobs/types";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";
import { useGetProjectByStatus } from "../hooks/useGetProjectByStatus";

import CustomPagination from "@/components/molecules/CustomPagination";
import ActiveProjectCard from "./ActiveProjectCard";

const ActiveProject = () => {
  const {
    isLoading,
    allProjects,
    handlePageChange,
    totalPages,
    currentPage,
    totalProject,
  } = useGetProjectByStatus("active");

  return (
    <div className="grid grid-cols-3 gap-5 pt-10 pb-28">
      {" "}
      {isLoading ? (
        <div className="col-span-2 w-full min-w-full max-md:col-span-3">
          <JobSkeleton className="w-full h-44 min-h-44 py-2" />
        </div>
      ) : (
        <>
          {allProjects?.length < 1 ? (
            <div className="max-w-lg w-full col-span-3">
              <h6 className="sm:text-xl whitespace-nowrap">
                {" "}
                No active Project
              </h6>
              <p className="max-sm:text-xs">
                Keep track of all active projects here.
              </p>
            </div>
          ) : (
            <>
              {allProjects?.map((project: Jobs) => (
                <ActiveProjectCard project={project} key={project?._id} />
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

export default ActiveProject;
