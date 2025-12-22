import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

interface PopularPriceDisplayProps {
  currency: string;
  startingPrice?: number;
  priceCaption: string;
  discountedPrice?: number;
  isDiscounted?: boolean;
}

const PopularPriceDisplay: React.FC<PopularPriceDisplayProps> = ({
  currency,
  startingPrice,
  priceCaption,
  discountedPrice,
  isDiscounted,
}) => {
  return (
    <>
      <p
        className={`w-full flex-c text-center text-sm max-md:text-xs ${
          isDiscounted && "line-through opacity-25"
        }`}
      >
        <span className="text-gray-500">{priceCaption}:</span>{" "}
        <span className="ml-2 font-semibold">
          {currency && getCurrencySign(currency)}
          {startingPrice ? numberWithCommas(startingPrice) : 0}
        </span>
      </p>
      {isDiscounted && (
        <p className="w-full flex-c text-center text-sm max-md:text-xs">
          <span className="text-gray-500">Discount Price:</span>{" "}
          <span className="ml-2 font-semibold">
            {currency && getCurrencySign(currency)}
            {discountedPrice && numberWithCommas(discountedPrice)}
          </span>
        </p>
      )}
    </>
  );
};

export default PopularPriceDisplay;
