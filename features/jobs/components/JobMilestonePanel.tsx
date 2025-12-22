import { JobMilestonePanelProps } from "../types";

import PaymentButton from "@/components/atoms/PaymentButton";
import MilestoneState from "@/components/molecules/MilestoneState";
import MilestonePaymentInfo from "@/components/molecules/MilestonePaymentInfo";
import JobPaymentModal from "@/components/organisms/modal/JobPaymentModal";

const JobMilestonePanel = ({
  currentMilestone,
  setOpenPaymentModal,
  openPaymentModal,
  onCancelPayment,
  currency,
  confirmPayment,
  loadingPayment,
  paymentDetails,
  handlePaymentChange,
  jobId,
  setCurrency,
  isAdditionalAmount,
  setIsAdditionalAmount,
  jobCurrency,
}: JobMilestonePanelProps) => {
  return (
    <>
      {currentMilestone.status !== "completed" ? (
        <div className="flex flex-col px-10 max-sm:px-5 w-full py-6">
          <MilestoneState imgUrl="/icons/checkbox.svg" />
          <div className="py-8">
            <PaymentButton className="bg-[#A2A4A2] cursor-not-allowed" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col  px-10 max-sm:px-5 w-full py-6">
          <MilestoneState imgUrl="/icons/tick-square.svg" />

          <>
            {currentMilestone?.paymentStatus === "paid" ||
            currentMilestone?.paymentStatus === "processing" ? (
              <MilestonePaymentInfo
                currency={currency}
                amountPaid={currentMilestone?.paymentInfo?.amountPaid}
                paymentMethod={currentMilestone?.paymentInfo?.paymentMethod}
                date={currentMilestone?.paymentInfo?.date}
              />
            ) : (
              <div className="py-8">
                <PaymentButton onClick={() => setOpenPaymentModal(true)} />

                {/* payment input modal */}
                <JobPaymentModal
                  isOpen={openPaymentModal}
                  onCancel={onCancelPayment}
                  confirmPayment={confirmPayment}
                  loadingPayment={loadingPayment}
                  paymentDetails={paymentDetails}
                  handlePaymentChange={handlePaymentChange}
                  milestoneId={currentMilestone?._id || ""}
                  currency={currency}
                  setCurrency={setCurrency}
                  jobId={jobId}
                  amount={currentMilestone?.amount}
                  jobCurrency={jobCurrency}
                  additionalAmount={currentMilestone?.invoice?.additionalAmount}
                  note={currentMilestone?.invoice?.note}
                  isAdditionalAmount={isAdditionalAmount}
                  setIsAdditionalAmount={setIsAdditionalAmount}
                />
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default JobMilestonePanel;
