"use client";

import { useCallback, useContext } from "react";

import { useDeleteJob } from "../hooks/useDeleteJob";
import { useGetJobInfo } from "../hooks/useGetJobInfo";
import { useAcceptDirectJob } from "../hooks/useAcceptDirectJob";
import { AuthContext } from "@/lib/context/AuthState";

import DirectJobDetails from "./DirectJobDetails";
import PageLoader from "@/components/atoms/PageLoader";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import JobPortal from "./JobPortal";
import DirectJobAssignee from "./DirectJobAssignee";
import MilestoneWrapper from "./MilestoneWrapper";
import LightGreenLayout from "@/components/templates/LightGreenLayout";

const DirectJobInfoWrapper = ({ jobId }: { jobId: string }) => {
  const { currentUser } = useContext(AuthContext);
  const { handleDeleteJob, isDeleting } = useDeleteJob();
  const { handleAcceptDirectJob, isAccepting } = useAcceptDirectJob();
  const { loading, getJobInfo, jobInfo, analytics } = useGetJobInfo(jobId);

  const isJobOwner = currentUser?._id === jobInfo?.userId?._id;

  const onAcceptJob = useCallback(
    (applicantId: string, status: string, businessId?: string) => {
      handleAcceptDirectJob(
        () => {
          getJobInfo();
        },
        applicantId,
        status,
        businessId
      );
    },
    []
  );

  return (
    <LightGreenLayout>
      {isAccepting && <WhiteBgLoader />}
      {loading ? (
        <PageLoader height="h-[80vh]" />
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <DirectJobDetails
            jobInfo={jobInfo}
            isJobOwner={isJobOwner}
            onAcceptJob={onAcceptJob}
            isDeleting={isDeleting}
            onDelete={handleDeleteJob}
          />
          {/* desktop view */}
          <section className="col-span-3 space-y-6 max-lg:hidden">
            <JobPortal
              analytics={analytics}
              jobInfo={jobInfo}
              isJobOwner={isJobOwner}
            />
            <DirectJobAssignee
              applicant={jobInfo?.applications[0]}
              isJobOwner={isJobOwner}
              type={jobInfo?.type}
              currency={jobInfo?.currency}
            />
          </section>

          <MilestoneWrapper
            milestones={jobInfo?.milestones}
            currency={jobInfo?.currency}
          />

          {/* mobile view */}
          <section className="col-span-12 lg:hidden space-y-6">
            <JobPortal
              analytics={analytics}
              jobInfo={jobInfo}
              isJobOwner={isJobOwner}
            />
            <DirectJobAssignee
              applicant={jobInfo?.applications[0]}
              isJobOwner={isJobOwner}
              type={jobInfo?.type}
              currency={jobInfo?.currency}
            />
          </section>
        </div>
      )}
    </LightGreenLayout>
  );
};

export default DirectJobInfoWrapper;
