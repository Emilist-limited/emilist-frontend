import { ActiveMilestoneInfoWrapperProps } from "@/features/jobs/types";

import MilestoneInfo from "./MilestoneInfo";
import JobMilestonePanel from "@/features/jobs/components/JobMilestonePanel";
import CustomButton from "../atoms/CustomButton";
import CloseContractModal from "./modal/CloseContractModal";
import ToggleaMilestones from "@/features/jobs/components/ToggleaMilestones";

const ActiveMilestoneInfoWrapper = ({
  jobInfo,
  openPaymentModal,
  setOpenPaymentModal,
  onCancelPayment,
  confirmPayment,
  loadingPayment,
  paymentDetails,
  handlePaymentChange,
  currency,
  setCurrency,
  isAdditionalAmount,
  setIsAdditionalAmount,
  currentMilestone,
  setCurrentMilestone,
  setOpenContractModal,
  openContractModal,
  onCancel,
  setRateServiceRendered,
  setRateServiceProvider,
  rateServiceProvider,
  rateServiceRendered,
  contractDetails,
  handleContractChange,
  closeContract,
  loadingContract,
  getJobInfo,
}: ActiveMilestoneInfoWrapperProps) => {
  const isAllMilestoneCompleted = jobInfo?.milestones?.every(
    (milestone: any) => milestone.status === "completed"
  );

  const isAllMilestonePaid = jobInfo?.milestones?.every(
    (milestone: any) => milestone.paymentStatus === "paid"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    closeContract(e, jobInfo?._id, () => {
      getJobInfo();
    });
  };

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

      <JobMilestonePanel
        currentMilestone={currentMilestone}
        openPaymentModal={openPaymentModal}
        setOpenPaymentModal={setOpenPaymentModal}
        onCancelPayment={onCancelPayment}
        jobCurrency={jobInfo?.currency}
        confirmPayment={confirmPayment}
        loadingPayment={loadingPayment}
        paymentDetails={paymentDetails}
        handlePaymentChange={handlePaymentChange}
        jobId={jobInfo?._id}
        currency={currency}
        setCurrency={setCurrency}
        isAdditionalAmount={isAdditionalAmount}
        setIsAdditionalAmount={setIsAdditionalAmount}
      />

      {isAllMilestoneCompleted && isAllMilestonePaid && (
        <div className="flex items-center justify-center">
          {jobInfo?.isClosed ? (
            <p className="text-primary-green font-bold uppercase">
              Congratulations, Contract finished & closed
            </p>
          ) : (
            <>
              <CustomButton onClick={() => setOpenContractModal(true)}>
                Close Contract
              </CustomButton>
              <CloseContractModal
                isOpen={openContractModal}
                onCancel={onCancel}
                setRateServiceRendered={setRateServiceRendered}
                setRateServiceProvider={setRateServiceProvider}
                rateServiceProvider={rateServiceProvider}
                contractDetails={contractDetails}
                handleContractChange={handleContractChange}
                closeContract={handleSubmit}
                loadingContract={loadingContract}
                rateServiceRendered={rateServiceRendered}
                jobId={jobInfo?._id}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveMilestoneInfoWrapper;
