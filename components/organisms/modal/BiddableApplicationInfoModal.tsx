import { memo } from "react";

import Currency from "@/components/atoms/Currency";
import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";

import { numberWithCommas } from "@/lib/helpers";
import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";

interface BiddableApplicationDetailsProps {
  onCancel: () => void;
  isOpen: boolean;
  updateApplicationStatus: (applicationId: string, status: string) => void;
  application: any;
  isAnyAccepted: boolean;
  jobInfo: any;
}

const BiddableApplicationInfoModal = memo(
  ({
    onCancel,
    isOpen,
    updateApplicationStatus,
    application,
    isAnyAccepted,
    jobInfo,
  }: BiddableApplicationDetailsProps) => {
    if (!isOpen) {
      return null;
    }
    return (
      <CustomModal isOpen={isOpen} onClose={onCancel}>
        <div className="pb-6">
          <h2 className="text-xl font-bold mb-6">Application details</h2>
          <div className="flex-c justify-between">
            <div className="flex gap-3 items-center">
              <h6 className="font-bold">Total amount:</h6>
              <p>
                <Currency currency={jobInfo?.currency} />
                {numberWithCommas(application?.biddableDetails?.maximumPrice)}
              </p>
            </div>
            <h6 className="text-sm font-medium max-sm:text-xs whitespace-nowrap">
              Posted:{" "}
              {application?.createdAt && formatCreatedAt(application.createdAt)}
            </h6>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            {application?.biddableDetails?.milestones?.map(
              (milestone: any, index: number) => (
                <div
                  key={index}
                  className={`flex flex-col  ${
                    application?.biddableDetails?.milestones?.length > 1 &&
                    application?.biddableDetails?.milestones?.length - 1 !==
                      index &&
                    "border-b-1 py-3"
                  }`}
                >
                  <div
                    className="flex flex-col gap-3 "
                    key={milestone?.milestoneId}
                  >
                    <h6 className="font-bold">Milestone {index + 1}</h6>
                    <div className="flex flex-col">
                      <h6 className="font-semibold">Amount</h6>
                      <p>
                        {" "}
                        {jobInfo?.currency}{" "}
                        {numberWithCommas(milestone?.amount)}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h6 className="font-semibold">
                        Details of what's to be achieved
                      </h6>
                      <p> {milestone?.achievement}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          {!isAnyAccepted && (
            <div className="flex gap-2 flex-wrap py-4">
              <CustomButton
                onClick={() => {
                  updateApplicationStatus(application?._id, "accepted");
                }}
              >
                Accept Application
              </CustomButton>

              <button
                className="red-btn"
                onClick={() => {
                  updateApplicationStatus(application?._id, "rejected");
                }}
              >
                Reject Application
              </button>
            </div>
          )}
        </div>
      </CustomModal>
    );
  }
);

export default BiddableApplicationInfoModal;
