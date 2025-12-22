"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { Jobs } from "../types";
import { ROUTES } from "@/lib/constants/routes";
import { useSaveJob } from "../hooks/useSaveJob";
import { useUnSave } from "../hooks/useUnSave";
import { useBlacklistJob } from "../hooks/useBlacklistJob";
import { useGetLeads } from "../hooks/useGetLeads";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";

import DashboardToggleSearchNavWrapper from "@/components/organisms/DashboardToggleSearchNavWrapper";
import CustomPagination from "@/components/molecules/CustomPagination";
import JobViewCard from "./JobViewCard";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

const WhiteBgLoader = dynamic(() => import("@/components/atoms/WhiteBgLoader"));

const DashboardLeadWrapper = () => {
  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading: isUnliking, handleUnsaveJob } = useUnSave();
  const { handleBlackListJob } = useBlacklistJob();

  const {
    isLoading,
    leads,
    search,
    handleChange,
    getLeads,
    handlePageChange,
    totalPages,
    currentPage,
    errMsg,
    setIsLoading,
    totalJobs,
  } = useGetLeads();

  const onSaveJob = (jobId: string) => {
    handleSaveJob(jobId, () => {
      getLeads();
    });
  };
  const onUnSaveJob = (jobId: string) => {
    handleUnsaveJob(jobId, () => {
      getLeads();
    });
  };

  const onBlacklistJob = (jobId: string) => {
    handleBlackListJob(jobId, () => {
      getLeads();
    });
  };

  const isSubmitting = loading || isUnliking;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await getLeads();
  };

  return (
    <div className="col-span-7 max-lg:col-span-10 w-full">
      {isSubmitting && <WhiteBgLoader />}
      <DashboardToggleSearchNavWrapper
        description="Search for jobs, view jobs specially for you, save jobs for quick access later, and blacklist jobs you're not interested in."
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="flex flex-col overflow-y-auto hide-scrollbar max-w-full overflow-x-hidden pb-6 bg-white rounded-b-lg px-1">
        {isLoading ? (
          <JobSkeleton className="w-full h-56 min-h-56 p-2" />
        ) : (
          <>
            {leads?.length < 1 ? (
              <div className="p-6">
                {search ? (
                  <NoMoreMessage message="No result found, try searching for something else" />
                ) : (
                  <>
                    {errMsg ? (
                      <p className="py-2">
                        Upgrade you plan{" "}
                        <Link
                          href={ROUTES?.SUBSCRIPTION_PLANS}
                          className="text-primary-green"
                        >
                          Here
                        </Link>{" "}
                        to access leads.
                      </p>
                    ) : (
                      <NoMoreMessage message="No job listed" />
                    )}
                  </>
                )}
              </div>
            ) : (
              <>
                {leads?.map((job: Jobs) => (
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

export default DashboardLeadWrapper;
