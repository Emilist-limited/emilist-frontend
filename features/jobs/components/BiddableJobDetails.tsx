"use client";

import dynamic from "next/dynamic";
import { Dispatch, memo, SetStateAction } from "react";

import { ROUTES } from "@/lib/constants/routes";
import { useJobActionState } from "../hooks/useJobActionState";

import JobInfoHeader from "./JobInfoHeader";
import JobActionDropdown from "./JobActionDropdown";
import JobActionPanel from "./JobActionPanel";
import BiddableJobInfo from "./BiddableJobInfo";

const ConfirmModal = dynamic(() => import("@/components/atoms/ConfirmModal"));

interface BiddableJobDetailsProps {
  jobInfo: any;
  onDelete: (jobId: string) => void;
  isDeleting: boolean;
  onApplicationWithdrawal: () => void;
  setOpenBidModal: (isOpen: boolean) => void;
  isApplied: () => boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  isJobOwner: boolean;
}

const BiddableJobDetails = memo(
  ({
    jobInfo,
    onDelete,
    isDeleting,
    setOpenBidModal,
    isApplied,
    onApplicationWithdrawal,
    setIsOpen,
    isJobOwner,
  }: BiddableJobDetailsProps) => {
    const {
      showActionDropdown,
      openConfirmActionModal,
      toggleActionButton,
      toggleConfirmActionModal,
    } = useJobActionState();

    return (
      <section className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-6">
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
              href={ROUTES?.EDIT_BIDDABLE_JOB(jobInfo?._id)}
              onDelete={toggleConfirmActionModal}
            />
          )}
        </JobInfoHeader>
        <ConfirmModal
          isOpen={openConfirmActionModal}
          question="Are you sure you want to delete this job?"
          onConfirm={() => onDelete(jobInfo._id)}
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
      </section>
    );
  }
);

export default BiddableJobDetails;
