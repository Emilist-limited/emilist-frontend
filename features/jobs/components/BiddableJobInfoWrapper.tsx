"use client";

import dynamic from "next/dynamic";
import { useCallback, useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useGetJobInfo } from "../hooks/useGetJobInfo";
import { useWithdrawApplication } from "../hooks/useWithdrawApplication";
import { useApplyJob } from "../hooks/useApplyJob";
import { usePromote } from "@/lib/hooks/usePromote";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import PageLoader from "@/components/atoms/PageLoader";
import BiddableJobDetails from "./BiddableJobDetails";
import JobPortal from "./JobPortal";
import Applicants from "./Applicants";
import MilestoneWrapper from "./MilestoneWrapper";
import LightGreenLayout from "@/components/templates/LightGreenLayout";

const ApplyBiddableJobModal = dynamic(
  () => import("@/components/organisms/modal/ApplyBiddableJobModal")
);
const PromoModal = dynamic(
  () => import("@/components/organisms/modal/PromoModal")
);

const BiddableJobInfoWrapper = ({ jobId }: { jobId: string }) => {
  const { currentUser } = useContext(AuthContext);
  const { handleDeleteJob, isDeleting } = useDeleteJob();
  const { loading, getJobInfo, jobInfo, analytics } = useGetJobInfo(jobId);
  const { isWithdrawing, handleWithdrawJobApplication } =
    useWithdrawApplication();
  const {
    applyForBiddableJob,
    isApplying,
    handleSetPercentage,
    setMaxPrice,
    maxPrice,
    milestones,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
    handleChange,
    handlePercentageBlur,
  } = useApplyJob("biddable");

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

  const isApplied = () =>
    jobInfo?.applications?.some(
      (userApplied: any) => userApplied?.user?._id === currentUser?._id
    );

  const isJobOwner = currentUser?._id === jobInfo?.userId?._id;

  const currentUserApplication = jobInfo?.applications?.find(
    (applicant: any) => applicant?.user?._id === currentUser?._id
  );

  const onApplicationWithdrawal = useCallback(() => {
    handleWithdrawJobApplication(currentUserApplication?._id, () => {
      getJobInfo();
    });
  }, [currentUserApplication]);

  const onApplyJob = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      jobId: string,
      businessId: string
    ) => {
      applyForBiddableJob(e, jobId, businessId, () => {
        getJobInfo();
      });
    },
    [applyForBiddableJob, getJobInfo]
  );

  return (
    <LightGreenLayout>
      {isWithdrawing && <WhiteBgLoader />}
      {loading ? (
        <PageLoader height="h-[80vh]" />
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <BiddableJobDetails
            jobInfo={jobInfo}
            onDelete={handleDeleteJob}
            isDeleting={isDeleting}
            onApplicationWithdrawal={onApplicationWithdrawal}
            setOpenBidModal={setOpenBidModal}
            isApplied={isApplied}
            setIsOpen={setIsOpen}
            isJobOwner={isJobOwner}
          />
          {/* desktop view */}
          <section className="col-span-3 space-y-6 max-lg:hidden">
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
            <Applicants
              getJobInfo={getJobInfo}
              jobInfo={jobInfo}
              isJobOwner={isJobOwner}
            />
          </section>
        </div>
      )}
      <ApplyBiddableJobModal
        onApplyJob={onApplyJob}
        bidLoading={isApplying}
        milestones={milestones}
        handleSetPercentage={handleSetPercentage}
        setMaxPrice={setMaxPrice}
        maxPrice={maxPrice}
        onCancel={handleCancelBidModal}
        isOpen={openBidModal}
        jobInfo={jobInfo}
        handleAchievementChange={handleAchievementChange}
        setMilestones={setMilestones}
        setPercentage={setPercentage}
        percentage={percentage}
        handleChange={handleChange}
        handlePercentageBlur={handlePercentageBlur}
      />
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

export default BiddableJobInfoWrapper;
