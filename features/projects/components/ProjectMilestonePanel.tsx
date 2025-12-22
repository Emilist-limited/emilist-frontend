"use client";

import { useState } from "react";

import MilestoneState from "@/components/molecules/MilestoneState";
import PaymentBreakdown from "./PaymentBreakdown";
import PaymentButton from "@/components/atoms/PaymentButton";
import UploadMilestoneInvoiceModal from "@/components/organisms/modal/UploadMilestoneInvoiceModal";

import { ProjectMilestonePanelProps } from "../types";

const ProjectMilestonePanel = ({
  currentMilestone,
  openInvoice,
  setOpenInvoice,
  handleChange,
  invoiceInfo,
  onUploadInvoice,
  showPaymentDetails,
  isSubmitting,
  currency,
}: ProjectMilestonePanelProps) => {
  const [updateStatus, setUpdateStatus] = useState(false);

  const allowInvoice =
    !updateStatus && currentMilestone?.status !== "completed";

  const toggleUpdateStatus = () => {
    setUpdateStatus((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col px-10 max-sm:px-5 w-full py-6">
        {allowInvoice ? (
          <>
            <MilestoneState
              imgUrl="/icons/checkbox.svg"
              onClick={toggleUpdateStatus}
            />
            <div className="py-8">
              <PaymentButton
                className="bg-[#A2A4A2] cursor-not-allowed"
                title="Enter Invoice"
              />
            </div>
          </>
        ) : (
          <>
            <MilestoneState
              imgUrl="/icons/tick-square.svg"
              onClick={toggleUpdateStatus}
            />
            {!currentMilestone?.invoice?.invoiceRaised && (
              <div className="py-8">
                <PaymentButton
                  title="Enter Invoice"
                  onClick={() => setOpenInvoice(true)}
                />
              </div>
            )}
          </>
        )}
        {showPaymentDetails && (
          <PaymentBreakdown
            currency={currency}
            currentMilestone={currentMilestone}
          />
        )}
      </div>
      <UploadMilestoneInvoiceModal
        isOpen={openInvoice}
        onCancel={() => setOpenInvoice(false)}
        milestoneId={currentMilestone._id || ""}
        milestoneAmount={currentMilestone.amount}
        onUploadInvoice={onUploadInvoice}
        currency={currency}
        handleChange={handleChange}
        invoiceInfo={invoiceInfo}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ProjectMilestonePanel;
