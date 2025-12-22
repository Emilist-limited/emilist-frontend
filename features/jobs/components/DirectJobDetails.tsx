"use client";

import { useCallback, useState } from "react";

import ConfirmModal from "@/components/atoms/ConfirmModal";
import JobInfoHeader from "./JobInfoHeader";
import JobActionPanel from "./JobActionPanel";
import JobActionDropdown from "./JobActionDropdown";
import BiddableJobInfo from "./BiddableJobInfo";
import AcceptDirectJobModal from "@/components/organisms/modal/AcceptDirectJobModal";

import { ROUTES } from "@/lib/constants/routes";
import { useJobActionState } from "../hooks/useJobActionState";

interface DirectJobDetailsProps {
  jobInfo: any;
  onDelete: (jobId: string) => void;
  isDeleting: boolean;
  isJobOwner: boolean;
  onAcceptJob: (
    applicantId: string,
    status: string,
    businessId?: string
  ) => void;
}

const DirectJobDetails = ({
  jobInfo,
  onDelete,
  isDeleting,
  isJobOwner,
  onAcceptJob,
}: DirectJobDetailsProps) => {
  const applicationId = jobInfo?.applications[0]?._id;
  const [isOpen, setIsOpen] = useState(false);
  const {
    showActionDropdown,
    openConfirmActionModal,
    toggleActionButton,
    toggleConfirmActionModal,
  } = useJobActionState();

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <section className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-6">
      <JobInfoHeader
        status={jobInfo?.status}
        title={jobInfo?.title}
        toggleActionButton={toggleActionButton}
        showActionDropdown={showActionDropdown}
        jobId={jobInfo?._id}
        border_bottom
      >
        {isJobOwner && jobInfo?.status === "pending" && (
          <JobActionDropdown
            href={ROUTES?.EDIT_DIRECT_JOB(jobInfo?._id)}
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
        isDirectJob={true}
        onAcceptDirectJob={onToggle}
        onRejectDirectJob={() => onAcceptJob(applicationId, "rejected")}
      />
      <BiddableJobInfo jobInfo={jobInfo} />
      <AcceptDirectJobModal
        isOpen={isOpen}
        onCancel={onToggle}
        onAcceptJob={onAcceptJob}
        applicationId={applicationId}
      />
    </section>
  );
};

export default DirectJobDetails;
