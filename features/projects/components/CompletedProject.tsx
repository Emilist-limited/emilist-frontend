"use client";

import { Jobs } from "@/features/jobs/types";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";
import { ROUTES } from "@/lib/constants/routes";
import { useGetProjectByStatus } from "../hooks/useGetProjectByStatus";

import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import CustomPagination from "@/components/molecules/CustomPagination";
import CompletedJobCard from "@/features/jobs/components/cards/CompletedJobCard";

const CompletedProject = () => {
  const {
    isLoading,
    allProjects,
    handlePageChange,
    totalPages,
    currentPage,
    totalProject,
  } = useGetProjectByStatus("completed");

  return (
    <div className="grid grid-cols-3 gap-5 pt-10 pb-28">
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
                No completed project
              </h6>
              <NoMoreMessage message="Keep track of all completed projects here." />
            </div>
          ) : (
            allProjects?.map((project: Jobs) => (
              <CompletedJobCard
                key={project?._id}
                job={project}
                href={
                  project?.type === "biddable"
                    ? ROUTES?.BIDDABLE_PROJECT_INFO(project._id)
                    : project?.type === "regular"
                    ? ROUTES?.REGULAR_PROJECT_INFO(project._id)
                    : ROUTES?.DIRECT_PROJECT_INFO(project._id)
                }
              />
            ))
          )}
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
    </div>
  );
};

export default CompletedProject;
