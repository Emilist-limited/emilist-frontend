import { getCurrencySign } from "@/lib/helpers/getCurrencySign";
import { Milestone } from "@/features/jobs/types";
import { numberWithCommas } from "@/lib/helpers";

import IconInfo from "../molecules/IconInfo";
import StatusBubble from "../atoms/StatusBubble";

interface MilestoneInfoProps {
  currency: string;
  milestone: Milestone;
  title?: string;
  border?: boolean;
}

const MilestoneInfo = ({
  milestone,
  currency,
  title,
  border = true,
}: MilestoneInfoProps) => {
  return (
    <div
      className={`w-full px-10 max-sm:px-5 py-6 space-y-6 ${
        border && "border-b-1 border-gray-300"
      }`}
    >
      {title && <h6 className="font-medium">{title}</h6>}
      <div className="">
        <div className="w-full flex items-center justify-between py-2">
          <h6 className="font-semibold max-sm:text-sm">Details</h6>
          <div className="flex justify-end">
            <StatusBubble status={milestone.status || "pending"} />
          </div>
        </div>
        <p className="max-sm:text-sm">
          {milestone?.achievement && milestone?.achievement}
        </p>
      </div>
      <div className="w-full">
        <div className="flex  gap-10 flex-wrap max-sm:gap-5  py-6">
          <IconInfo
            imgUrl="/icons/clock.svg"
            alt="clock-icon"
            value={`${milestone?.timeFrame?.number} ${milestone?.timeFrame?.period}`}
            title="Milestone duration"
          />
          <IconInfo
            imgUrl="/icons/empty-wallet.svg"
            alt="wallet-icon"
            value={`${currency && getCurrencySign(currency)} ${
              milestone?.amount && numberWithCommas(milestone?.amount)
            }`}
            title="Amount"
          />
        </div>
      </div>
    </div>
  );
};

export default MilestoneInfo;
