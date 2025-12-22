import { format } from "date-fns";

import { numberWithCommas } from "@/lib/helpers";
import { formatDueDate, formatOverDueDate } from "@/lib/helpers/dates";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

import IconInfo from "@/components/molecules/IconInfo";
import ReadMore from "@/components/molecules/ReadMore";
import StatusBubble from "@/components/atoms/StatusBubble";

interface ActiveJobInfoProps {
  jobInfo: any;
}

const ActiveJobInfo = ({ jobInfo }: ActiveJobInfoProps) => {
  const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const jobDueDate = format(jobInfo?.dueDate, "yyyy-MM-dd HH:mm:ss");

  const isCurrentDateMore = currentDate > jobDueDate;

  return (
    <div className="w-full px-10 max-sm:px-5 py-6 ">
      <div className="flex items-center sm:gap-20 gap-10 flex-wrap">
        <IconInfo
          imgUrl="/icons/clock.svg"
          alt="clock-icon"
          value={`${jobInfo.duration?.number} ${jobInfo.duration?.period}`}
          title="Project duration"
        />
        {jobInfo?.bidRange && (
          <IconInfo
            imgUrl="/icons/empty-wallet.svg"
            alt="wallet-icon"
            value={`${
              jobInfo?.currency && getCurrencySign(jobInfo?.currency)
            } ${jobInfo?.bidRange && numberWithCommas(jobInfo.bidRange)}`}
            title="Bid range"
          />
        )}

        <IconInfo
          imgUrl="/icons/dollar-circle.svg"
          alt="dollar-icon"
          value={`${jobInfo?.currency && getCurrencySign(jobInfo?.currency)}${
            jobInfo?.maximumPrice
              ? numberWithCommas(jobInfo.maximumPrice)
              : jobInfo?.budget && numberWithCommas(jobInfo.budget)
          }`}
          title="Agreed Amount"
        />
      </div>
      <div className="w-full py-6">
        <div className="w-full flex sm:items-center justify-between">
          <h6 className="font-semibold max-sm:text-sm">Project details</h6>
          {jobInfo?.status === "completed" ? (
            <StatusBubble status="active" title="completed" />
          ) : (
            <div className="flex  gap-1 sm:items-center max-sm:flex-col">
              <p className="text-[#5E625F]  text-sm font-medium max-sm:text-xs whitespace-nowrap">
                {isCurrentDateMore ? "Overdue since" : "Due date"}
              </p>
              <StatusBubble
                status={isCurrentDateMore ? "overdue" : "active"}
                title={
                  jobInfo?.dueDate && isCurrentDateMore
                    ? formatOverDueDate(jobInfo?.dueDate)
                    : formatDueDate(jobInfo?.dueDate)
                }
              />
            </div>
          )}
        </div>
        <ReadMore text={jobInfo?.description} maxLength={300} />
      </div>
    </div>
  );
};

export default ActiveJobInfo;
