"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import CustomPagination from "@/components/molecules/CustomPagination";
import JobViewCard from "./JobViewCard";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

import { Jobs } from "../types";
import { JobSkeleton } from "@/components/molecules/skeletonLoaders/JobSkeleton";
import { ROUTES } from "@/lib/constants/routes";
import { useSaveJob } from "../hooks/useSaveJob";
import { useUnSave } from "../hooks/useUnSave";
import { useBlacklistJob } from "../hooks/useBlacklistJob";
import { useGetLeads } from "../hooks/useGetLeads";

const WhiteBgLoader = dynamic(() => import("@/components/atoms/WhiteBgLoader"));

const LeadJobs = () => {
  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading: isUnliking, handleUnsaveJob } = useUnSave();
  const { handleBlackListJob } = useBlacklistJob();
  const {
    isLoading,
    leads,
    getLeads,
    handlePageChange,
    totalPages,
    currentPage,
    errMsg,
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

  return (
    <div className="grid grid-cols-3 gap-5 pt-10 pb-28">
      {isSubmitting && <WhiteBgLoader />}
      <div className="col-span-2 w-full min-w-full max-md:col-span-3">
        {isLoading ? (
          <JobSkeleton className="w-full h-44 min-h-44 py-2" />
        ) : (
          <>
            {leads?.length < 1 ? (
              <div className="p-6 col-span-3">
                {errMsg ? (
                  <p className="py-2">
                    Upgrade your plan{" "}
                    <Link
                      href={ROUTES?.SUBSCRIPTION_PLANS}
                      className="text-primary-green underline"
                    >
                      here
                    </Link>{" "}
                    to access leads.
                  </p>
                ) : (
                  <NoMoreMessage message="No job listed" />
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

export default LeadJobs;
