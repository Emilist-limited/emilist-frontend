import { memo } from "react";

import { ProjectMilestoneInfoWrapperProps } from "../types";

import MilestoneInfo from "@/components/organisms/MilestoneInfo";
import ProjectMilestonePanel from "./ProjectMilestonePanel";
import ToggleaMilestones from "@/features/jobs/components/ToggleaMilestones";

const ProjectMilestoneInfoWrapper = memo(
  ({
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
    openInvoice,
    setOpenInvoice,
    handleChange,
    invoiceInfo,
    onUploadInvoice,
    showPaymentDetails,
    isSubmitting,
  }: ProjectMilestoneInfoWrapperProps) => {
    return (
      <div className="col-span-9 max-lg:col-span-12 flex flex-col w-full bg-white rounded-lg py-10">
        <ToggleaMilestones
          milestones={jobInfo?.milestones}
          currentMilestoneId={currentMilestone?._id || ""}
          setCurrentMilestone={setCurrentMilestone}
        />
        {currentMilestone && (
          <div className="w-full">
            <MilestoneInfo
              milestone={currentMilestone}
              currency={jobInfo?.currency}
            />
          </div>
        )}
        {currentMilestone.status !== "pending" && (
          <ProjectMilestonePanel
            currentMilestone={currentMilestone}
            setOpenInvoice={setOpenInvoice}
            openInvoice={openInvoice}
            handleChange={handleChange}
            invoiceInfo={invoiceInfo}
            onUploadInvoice={onUploadInvoice}
            showPaymentDetails={showPaymentDetails}
            isSubmitting={isSubmitting}
            currency={jobInfo?.currency}
          />
        )}
      </div>
    );
  }
);

export default ProjectMilestoneInfoWrapper;
