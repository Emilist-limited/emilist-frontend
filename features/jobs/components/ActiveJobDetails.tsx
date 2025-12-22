"use client";

import { useState } from "react";

import { ActiveJobDetailsProps } from "../types";

import ActiveJobInfo from "./ActiveJobInfo";
import ActiveJobActionDropdown from "./ActiveJobActionDropdown";
import JobInfoHeader from "./JobInfoHeader";
import WorkerInfo from "./WorkerInfo";

const ActiveJobDetails = ({
  jobInfo,
  jobId,
  updateApplicationStatus,
  requestQuote,
  acceptQuote,
  getJobInfo,
  onToggleQuoteInfo,
  openQuoteInfoModal,
}: ActiveJobDetailsProps) => {
  const [showActionDropdown, setShowActionDropdown] = useState(false);

  const acceptedApplication = jobInfo?.applications?.find(
    (applicant: any) => applicant?._id === jobInfo?.acceptedApplicationId
  );

  const canViewQuote =
    acceptedApplication?.quote && acceptedApplication?.quote?.totalAmount;

  const toggleActionButton = () => {
    setShowActionDropdown((prev) => !prev);
  };
  return (
    <div className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-6">
      <JobInfoHeader
        status={jobInfo?.status}
        title={jobInfo?.title}
        toggleActionButton={toggleActionButton}
        showActionDropdown={showActionDropdown}
        jobId={jobId}
      >
        <ActiveJobActionDropdown
          jobInfo={jobInfo}
          jobId={jobId}
          updateApplicationStatus={updateApplicationStatus}
          toggleActionButton={toggleActionButton}
          requestQuote={requestQuote}
          acceptedApplicationId={jobInfo?.acceptedApplicationId}
          getJobInfo={getJobInfo}
          acceptQuote={acceptQuote}
          acceptedApplication={acceptedApplication}
          canViewQuote={canViewQuote}
          openQuoteInfoModal={openQuoteInfoModal}
          onToggleQuoteInfo={onToggleQuoteInfo}
        />
      </JobInfoHeader>
      <ActiveJobInfo jobInfo={jobInfo} />
      <WorkerInfo acceptedApplication={acceptedApplication} />
    </div>
  );
};

export default ActiveJobDetails;
