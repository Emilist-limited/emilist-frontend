import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

const EarningsCard = ({
  className,
  value,
  currentCurrency,
  title,
  timeFrame,
}: {
  className: string;
  value: number;
  currentCurrency: string;
  title: string;
  timeFrame: number;
}) => {
  return (
    <div className="max-w-full w-full flex-1 min-w-[340px] max-h-[160px] bg-white  px-4 py-6  border-1 rounded-lg">
      <p className="sm:text-lg font-medium">{title}</p>
      <h2 className={`text-3xl font-bold max-sm:text-2xl ${className}`}>
        {currentCurrency && getCurrencySign(currentCurrency)}
        {value && numberWithCommas(value)}
      </h2>
      <p className="text-[#303632] text-sm max-sm:text-xs ">
        This {timeFrame && timeFrame}
      </p>
    </div>
  );
};

export default EarningsCard;
