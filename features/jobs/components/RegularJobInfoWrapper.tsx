"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useGetJobInfo } from "../hooks/useGetJobInfo";
import { usePromote } from "@/lib/hooks/usePromote";

import PromoModal from "@/components/organisms/modal/PromoModal";
import JobDetails from "./JobDetails";
import PageLoader from "@/components/atoms/PageLoader";
import JobPortal from "./JobPortal";
import MilestoneWrapper from "./MilestoneWrapper";
import Applicants from "./Applicants";
import LightGreenLayout from "@/components/templates/LightGreenLayout";

const RegularJobInfoWrapper = ({ jobId }: { jobId: string }) => {
  const { currentUser } = useContext(AuthContext);

  const { loading, getJobInfo, jobInfo, analytics } = useGetJobInfo(jobId);
  const {
    expectedClicks,
    handleClickChange,
    target,
    setTarget,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoad,
    handlePromote,
    isOpen,
    setIsOpen,
  } = usePromote();

  const isJobOwner = currentUser?._id === jobInfo?.userId?._id;

  return (
    <LightGreenLayout>
      {loading ? (
        <PageLoader height="h-[80vh]" />
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <JobDetails
            jobInfo={jobInfo}
            setIsOpen={setIsOpen}
            isJobOwner={isJobOwner}
            getJobInfo={getJobInfo}
          />
          <div className="col-span-3 space-y-6 max-lg:hidden">
            <JobPortal
              analytics={analytics}
              jobInfo={jobInfo}
              isJobOwner={isJobOwner}
            />
            <Applicants
              getJobInfo={getJobInfo}
              jobInfo={jobInfo}
              isJobOwner={isJobOwner}
            />
          </div>
          <MilestoneWrapper
            milestones={jobInfo?.milestones}
            currency={jobInfo?.currency}
          />
          <div className="col-span-12 lg:hidden space-y-6">
            <JobPortal
              analytics={analytics}
              jobInfo={jobInfo}
              isJobOwner={isJobOwner}
            />
            <Applicants
              getJobInfo={getJobInfo}
              jobInfo={jobInfo}
              isJobOwner={isJobOwner}
            />
          </div>
        </div>
      )}
      <PromoModal
        onCancel={() => setIsOpen(false)}
        isOpen={isOpen}
        expectedClicks={expectedClicks}
        handleClickChange={handleClickChange}
        target={target}
        setTarget={setTarget}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        isLoad={isLoad}
        handlePromote={handlePromote}
        type="job"
        id={jobId}
      />
    </LightGreenLayout>
  );
};

export default RegularJobInfoWrapper;
