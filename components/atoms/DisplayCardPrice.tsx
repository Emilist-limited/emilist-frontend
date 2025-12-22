import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";
import { PriceDisplayProps } from "@/types";

const DisplayCardPrice: React.FC<PriceDisplayProps> = ({ currency, price }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="sm:text-2xl font-bold text-primary-green">
        {currency && getCurrencySign(currency)}
        {numberWithCommas(price)}
      </p>
    </div>
  );
};

export default DisplayCardPrice;
