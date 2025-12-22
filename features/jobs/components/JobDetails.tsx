"use client";

import { useCallback, useContext } from "react";

import ApplyRegularJobModal from "@/components/organisms/modal/ApplyRegularJobModal";
import BiddableJobInfo from "./BiddableJobInfo";
import ConfirmModal from "@/components/atoms/ConfirmModal";
import JobInfoHeader from "./JobInfoHeader";
import JobActionPanel from "./JobActionPanel";
import JobActionDropdown from "./JobActionDropdown";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useJobActionState } from "../hooks/useJobActionState";
import { useApplyJob } from "../hooks/useApplyJob";
import { useWithdrawApplication } from "../hooks/useWithdrawApplication";

interface JobDetailsProps {
  jobInfo: any;
  isJobOwner: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  getJobInfo: () => Promise<void>;
}

const JobDetails = ({
  jobInfo,
  isJobOwner,
  setIsOpen,
  getJobInfo,
}: JobDetailsProps) => {
  const { currentUser } = useContext(AuthContext);
  const { handleDeleteJob, isDeleting } = useDeleteJob();
  const {
    applyForBiddableJob,
    isApplying,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
  } = useApplyJob("regular");
  const { isWithdrawing, handleWithdrawJobApplication } =
    useWithdrawApplication();
  const {
    showActionDropdown,
    openConfirmActionModal,
    toggleActionButton,
    toggleConfirmActionModal,
  } = useJobActionState();

  const currentUserApplication = jobInfo?.applications?.find(
    (applicant: any) => applicant?.user?._id === currentUser?._id
  );

  const isApplied = () =>
    jobInfo?.applications?.some(
      (userApplied: any) => userApplied?.user?._id === currentUser?._id
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
    []
  );

  return (
    <section className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-6">
      {isWithdrawing && <WhiteBgLoader />}
      <JobInfoHeader
        status={jobInfo.status}
        title={jobInfo?.title}
        toggleActionButton={toggleActionButton}
        showActionDropdown={showActionDropdown}
        jobId={jobInfo?._id}
        setIsOpen={setIsOpen}
        isJobOwner={isJobOwner}
        showPromoteInsight
        border_bottom
      >
        {isJobOwner && jobInfo?.status === "pending" && (
          <JobActionDropdown
            href={ROUTES?.EDIT_REGULAR_JOB(jobInfo?._id)}
            onDelete={toggleConfirmActionModal}
          />
        )}
      </JobInfoHeader>
      <ConfirmModal
        isOpen={openConfirmActionModal}
        question="Are you sure you want to delete this job?"
        onConfirm={() => handleDeleteJob(jobInfo._id)}
        onClose={toggleConfirmActionModal}
        loading={isDeleting}
      />
      <JobActionPanel
        jobInfo={jobInfo}
        onApply={() => setOpenBidModal(true)}
        onApplicationWithdrawal={onApplicationWithdrawal}
        isApplied={isApplied}
      />
      <BiddableJobInfo jobInfo={jobInfo} />
      <ApplyRegularJobModal
        onApplyJob={onApplyJob}
        isApplying={isApplying}
        jobId={jobInfo?._id}
        onCancel={handleCancelBidModal}
        isOpen={openBidModal}
      />
    </section>
  );
};

export default JobDetails;
