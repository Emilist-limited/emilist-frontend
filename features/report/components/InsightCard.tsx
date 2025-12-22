import CustomButton from "@/components/atoms/CustomButton";

import { numberWithCommas } from "@/lib/helpers";

interface InsightCardProps {
  title: string;
  currentValue: number;
  overallValue: number;
  noOfDaysLeft: string;
}

const InsightCard = ({
  title,
  currentValue,
  overallValue,
  noOfDaysLeft,
}: InsightCardProps) => {
  return (
    <div className="bg-white max-w-[400px] w-full min-w-[270px] h-[285px] shadow-md rounded-lg p-6 py-8">
      <h2 className="font-bold sm:text-xl max-sm: mb-10">{title}</h2>
      <div className="w-full my-8">
        <div className="flex justify-between items-center w-full">
          <h6 className=" font-medium mb-1 max-sm:text-xs">
            {currentValue && numberWithCommas(currentValue)}/
            {overallValue && numberWithCommas(overallValue)}
          </h6>
          <h6 className=" font-medium mb-1 max-sm:text-xs">{noOfDaysLeft}</h6>
        </div>
        <div className="flex items-center w-full gap-4">
          <progress
            className="progress w-full progress-neutral"
            value={currentValue}
            max={overallValue}
          ></progress>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <CustomButton> Add More Subscription</CustomButton>
      </div>
    </div>
  );
};

export default InsightCard;
