import IconInfo from "@/components/molecules/IconInfo";
import ReadMore from "@/components/molecules/ReadMore";
import ShowImage from "@/components/molecules/ShowImage";

import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";
import { getLevelValue } from "@/lib/helpers/getLevelValue";

interface BiddableJobInfoProps {
  jobInfo: any;
}

const BiddableJobInfo = ({ jobInfo }: BiddableJobInfoProps) => {
  return (
    <div>
      <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
        <IconInfo
          imgUrl="/icons/location.svg"
          alt="location-icon"
          value={`${jobInfo?.location && Capitalize(jobInfo?.location)}`}
          title="Location"
        />
      </div>
      <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
        <ReadMore text={jobInfo?.description} maxLength={200} />
      </div>
      <div className="w-full px-10 max-sm:px-5 py-6 ">
        <div className="flex items-center sm:gap-20 gap-10 flex-wrap">
          <IconInfo
            imgUrl="/icons/layer.svg"
            alt="layer-icon"
            value={`${jobInfo?.milestones && jobInfo.milestones?.length}`}
            title="Milestone"
          />
          <IconInfo
            imgUrl="/icons/clock.svg"
            alt="clock-icon"
            value={`${jobInfo.duration?.number} ${jobInfo.duration?.period}`}
            title="Project duration"
          />
          <IconInfo
            imgUrl="/icons/guru 1.svg"
            alt="guru-icon"
            value={`${
              jobInfo?.expertLevel && getLevelValue(jobInfo.expertLevel)
            }`}
            title="Expert level"
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
            value={`${
              jobInfo?.currency && getCurrencySign(jobInfo?.currency)
            } ${
              jobInfo?.maximumPrice
                ? numberWithCommas(jobInfo.maximumPrice)
                : jobInfo?.budget && numberWithCommas(jobInfo.budget)
            }`}
            title={jobInfo?.maximumPrice ? "Maximum price" : "Budget"}
          />
        </div>
      </div>
      {jobInfo?.jobFiles?.length > 0 && (
        <div className="px-10 max-sm:px-5 py-6 w-full">
          <h6 className="text-lg font-semibold max-sm:text-sm font-inter">
            Files
          </h6>
          <div className="flex items-center w-full gap-2 pt-4 flex-wrap">
            {jobInfo?.jobFiles?.map((file: any, index: number) => (
              <ShowImage
                key={index}
                alt="business file"
                src={file?.url}
                extraStyle="w-28 h-28 max-sm:w-20 max-sm:h-20"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddableJobInfo;
