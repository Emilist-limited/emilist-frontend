import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

const PopularJobPriceDisplay: React.FC<{
  type: "biddable" | "regular";
  currency: string;
  budget?: number;
  maximumPrice?: number;
}> = ({ type, currency, budget, maximumPrice }) => (
  <p className="w-full flex-c text-sm max-md:text-xs pt-4">
    <span className="text-gray-500">
      {type === "regular" ? "Budget" : "Max price"}:
    </span>
    <span className="ml-2 font-semibold">
      {currency && getCurrencySign(currency)}
      {budget
        ? numberWithCommas(budget)
        : maximumPrice
        ? numberWithCommas(maximumPrice)
        : null}
    </span>
  </p>
);

export default PopularJobPriceDisplay;
