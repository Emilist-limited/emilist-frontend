"use client";

import ActionMenuDropdownButton from "@/components/atoms/ActionMenuDropdownButton";

const QuoteDetailsModal = dynamic(
  () => import("@/components/organisms/modal/QuoteDetailsModal")
);

import { ActiveJobActionDropdownProps } from "../types";
import dynamic from "next/dynamic";

const ActiveJobActionDropdown = ({
  jobInfo,
  updateApplicationStatus,
  toggleActionButton,
  acceptedApplicationId,
  getJobInfo,
  requestQuote,
  jobId,
  acceptQuote,
  canViewQuote,
  acceptedApplication,
  onToggleQuoteInfo,
  openQuoteInfoModal,
}: ActiveJobActionDropdownProps) => {
  const onApplicationStatusUpdate = async (status: string) => {
    await updateApplicationStatus(acceptedApplicationId, status, () => {
      getJobInfo();
    });
    toggleActionButton();
  };

  const onRequestQuote = () => {
    requestQuote(jobId, () => {
      getJobInfo();
    });
  };

  return (
    <>
      {jobInfo?.status === "paused" ? (
        <ActionMenuDropdownButton
          title="Resume Job"
          onClick={() => onApplicationStatusUpdate("unpause")}
        />
      ) : (
        <ActionMenuDropdownButton
          title="Pause Job"
          onClick={() => onApplicationStatusUpdate("pause")}
        />
      )}
      {jobInfo?.isRequestForQuote === false && (
        <ActionMenuDropdownButton
          title="Request for Quote"
          onClick={onRequestQuote}
        />
      )}
      {canViewQuote && (
        <>
          <ActionMenuDropdownButton
            title="View Quote"
            onClick={onToggleQuoteInfo}
          />
          <QuoteDetailsModal
            Quote={acceptedApplication?.quote}
            acceptQuote={acceptQuote}
            applicantId={acceptedApplication?._id}
            jobInfo={jobInfo}
            getJobInfo={getJobInfo}
            openQuoteInfoModal={openQuoteInfoModal}
            onToggleQuoteInfo={onToggleQuoteInfo}
          />
        </>
      )}
    </>
  );
};

export default ActiveJobActionDropdown;
