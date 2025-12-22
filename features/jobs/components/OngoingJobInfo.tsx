"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { hasInvoice } from "@/types/hasInvoice";
import { useCloseContract } from "../hooks/useCloseContract";
import { useConfirmJobPayment } from "../hooks/useConfirmJobPayment";
import { useGetJobInfo } from "../hooks/useGetJobInfo";
import { useRequestQuote } from "../hooks/useRequestQuote";
import { useAcceptQuote } from "../hooks/useAcceptQuote";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import ActiveJobDetails from "./ActiveJobDetails";
import PageLoader from "@/components/atoms/PageLoader";
import MilestoneInvoice from "@/components/molecules/MilestoneInvoice";
import ActiveMilestoneInfoWrapper from "@/components/organisms/ActiveMilestoneInfoWrapper";
import LightGreenLayout from "@/components/templates/LightGreenLayout";

const OngoingJobInfo = ({ jobId }: { jobId: string }) => {
  const { currentUser } = useContext(AuthContext);
  const { requestQuote, requestLoading } = useRequestQuote();
  const {
    acceptQuote,
    loadingAcceptQuote,
    onToggleQuoteInfo,
    openQuoteInfoModal,
  } = useAcceptQuote();
  const { updateApplicationStatus, loadingAccept } =
    useUpdateApplicationStatus();
  const {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  } = useGetJobInfo(jobId);
  const {
    confirmPayment,
    loadingPayment,
    onCancelPayment,
    paymentDetails,
    handlePaymentChange,
    openPaymentModal,
    setOpenPaymentModal,
    currency,
    setCurrency,
    isAdditionalAmount,
    setIsAdditionalAmount,
  } = useConfirmJobPayment();
  const {
    closeContract,
    loadingContract,
    onCancel,
    contractDetails,
    handleContractChange,
    openContractModal,
    setOpenContractModal,
    setRateServiceRendered,
    setRateServiceProvider,
    rateServiceProvider,
    rateServiceRendered,
  } = useCloseContract();

  const isJobOwner = currentUser?._id === jobInfo?.userId?._id;

  const isSubmitting = loadingAccept || requestLoading || loadingAcceptQuote;

  return (
    <LightGreenLayout>
      {isSubmitting && <WhiteBgLoader />}
      {loading ? (
        <PageLoader height="h-[80vh]" />
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <ActiveJobDetails
            jobInfo={jobInfo}
            jobId={jobId}
            updateApplicationStatus={updateApplicationStatus}
            requestQuote={requestQuote}
            acceptQuote={acceptQuote}
            getJobInfo={getJobInfo}
            openQuoteInfoModal={openQuoteInfoModal}
            onToggleQuoteInfo={onToggleQuoteInfo}
          />
          {hasInvoice(jobInfo?.milestones) && (
            <div className="col-span-3 max-lg:hidden max-h-max">
              <MilestoneInvoice jobInfo={jobInfo} isJobOwner={isJobOwner} />
            </div>
          )}
          <ActiveMilestoneInfoWrapper
            jobInfo={jobInfo}
            currentMilestone={currentMilestone}
            setCurrentMilestone={setCurrentMilestone}
            openPaymentModal={openPaymentModal}
            setOpenPaymentModal={setOpenPaymentModal}
            onCancelPayment={onCancelPayment}
            confirmPayment={confirmPayment}
            loadingPayment={loadingPayment}
            paymentDetails={paymentDetails}
            handlePaymentChange={handlePaymentChange}
            currency={currency}
            setCurrency={setCurrency}
            isAdditionalAmount={isAdditionalAmount}
            setIsAdditionalAmount={setIsAdditionalAmount}
            setOpenContractModal={setOpenContractModal}
            openContractModal={openContractModal}
            onCancel={onCancel}
            setRateServiceRendered={setRateServiceRendered}
            setRateServiceProvider={setRateServiceProvider}
            rateServiceProvider={rateServiceProvider}
            rateServiceRendered={rateServiceRendered}
            contractDetails={contractDetails}
            handleContractChange={handleContractChange}
            closeContract={closeContract}
            getJobInfo={getJobInfo}
            loadingContract={loadingContract}
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

export default OngoingJobInfo;
