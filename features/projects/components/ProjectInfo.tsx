"use client";

import { useCallback, useContext } from "react";

import { hasInvoice } from "@/types/hasInvoice";
import { showQuoteComponent } from "../helpers";
import { useGetJobInfo } from "@/features/jobs/hooks/useGetJobInfo";
import { AuthContext } from "@/lib/context/AuthState";
import { useUploadInvoiceForMilestone } from "../hooks/useUploadInvoiceForMilestone";

import LightGreenLayout from "@/components/templates/LightGreenLayout";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import PageLoader from "@/components/atoms/PageLoader";
import AddQuote from "./AddQuote";
import ProjectDetails from "./ProjectDetails";
import MilestoneInvoice from "@/components/molecules/MilestoneInvoice";
import ProjectMilestoneInfoWrapper from "./ProjectMilestoneInfoWrapper";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser?._id;
  const {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  } = useGetJobInfo(projectId);

  const {
    uploadInvoice,
    isSubmitting,
    setOpenInvoice,
    openInvoice,
    handleChange,
    invoiceInfo,
  } = useUploadInvoiceForMilestone();

  const isAddQuote =
    showQuoteComponent(jobInfo, currentUserId) &&
    jobInfo?.status !== "completed";

  const isJobOwner = currentUserId === jobInfo?.userId?._id;

  const showPaymentDetails =
    currentMilestone?.paymentStatus === "paid" ||
    currentMilestone?.paymentStatus === "processing";

  const onUploadInvoice = useCallback(
    (e: React.FormEvent<HTMLFormElement>, milestoneId: string) => {
      uploadInvoice(e, projectId, milestoneId, () => {
        getJobInfo();
      });
    },
    [projectId, getJobInfo]
  );

  return (
    <LightGreenLayout>
      {isSubmitting && <WhiteBgLoader />}
      {loading ? (
        <PageLoader height="h-[80vh]" />
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          {isAddQuote && <AddQuote jobInfo={jobInfo} getJobInfo={getJobInfo} />}
          <ProjectDetails jobInfo={jobInfo} />
          {hasInvoice(jobInfo?.milestones) && (
            <div className="col-span-3 max-lg:hidden max-h-max">
              <MilestoneInvoice jobInfo={jobInfo} isJobOwner={isJobOwner} />
            </div>
          )}

          <ProjectMilestoneInfoWrapper
            jobInfo={jobInfo}
            currentMilestone={currentMilestone}
            setCurrentMilestone={setCurrentMilestone}
            setOpenInvoice={setOpenInvoice}
            openInvoice={openInvoice}
            handleChange={handleChange}
            invoiceInfo={invoiceInfo}
            onUploadInvoice={onUploadInvoice}
            showPaymentDetails={showPaymentDetails}
            isSubmitting={isSubmitting}
          />

          {hasInvoice(jobInfo?.milestones) && (
            <div className="col-span-9 max-lg:col-span-12 lg:hidden max-h-max">
              <MilestoneInvoice jobInfo={jobInfo} isJobOwner={isJobOwner} />
            </div>
          )}
        </div>
      )}
    </LightGreenLayout>
  );
};

export default ProjectInfo;
