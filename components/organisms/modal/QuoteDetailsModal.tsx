import Currency from "@/components/atoms/Currency";
import CustomModal from "@/components/atoms/CustomModal";
import StatusBubble from "@/components/atoms/StatusBubble";

import { numberWithCommas } from "@/lib/helpers";
import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";

interface QuoteDetailsModalProps {
  Quote: any;
  acceptQuote: (
    id: string,
    status: string,
    onSuccess: () => void
  ) => Promise<void>;
  applicantId: string;
  jobInfo: any;
  getJobInfo: () => Promise<void>;
  onToggleQuoteInfo: () => void;
  openQuoteInfoModal: boolean;
}

const QuoteDetailsModal = ({
  Quote,
  acceptQuote,
  applicantId,
  jobInfo,
  getJobInfo,
  onToggleQuoteInfo,
  openQuoteInfoModal,
}: QuoteDetailsModalProps) => {
  const onAcceptQuote = (status: string) => {
    acceptQuote(applicantId, status, () => {
      getJobInfo();
    });
  };

  return (
    <CustomModal isOpen={openQuoteInfoModal} onClose={onToggleQuoteInfo}>
      <div className="">
        <div className="flex-c-b">
          <h2 className="text-xl font-bold mb-6">Quote details</h2>
          <StatusBubble status={Quote?.status} />
        </div>

        <div className="flex-c justify-between">
          <div className="flex gap-3 items-center">
            <h6 className="font-bold">Total amount:</h6>
            <p>
              <Currency currency={jobInfo?.currency} />
              {Quote?.totalAmount && numberWithCommas(Quote?.totalAmount)}
            </p>
          </div>
          <h6 className="text-[#737774] text-sm  font-medium max-sm:text-xs whitespace-nowrap">
            Posted: {Quote?.postedAt && formatCreatedAt(Quote.postedAt)}
          </h6>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          {Quote?.milestones?.map((milestone: any, index: number) => (
            <div
              className={`flex flex-col  ${
                Quote?.milestones?.length > 1 &&
                Quote?.milestones?.length - 1 !== index &&
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
                    {jobInfo?.currency} {numberWithCommas(milestone?.amount)}
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
          ))}
        </div>
        <div className="flex gap-2">
          <button
            className="custom-btn mt-8"
            onClick={() => onAcceptQuote("accepted")}
          >
            Accept quote
          </button>
          <button
            className="bg-red-500 text-white hover:bg-red-600 whitespace-nowrap transition-all duration-300 rounded-lg px-6 py-3 text-center mt-8"
            onClick={() => onAcceptQuote("rejected")}
          >
            Reject quote
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default QuoteDetailsModal;
