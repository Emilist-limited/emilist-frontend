import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

interface CartPricingProps {
  title: string;
  price: number;
  currency: string;
}

const CartPricing = ({ title, currency, price }: CartPricingProps) => {
  return (
    <>
      <div className="max-md:hidden flex-c-b sm:gap-6 gap-4 px-2 py-3 min-w-44 border-1 border-gray-500 rounded-md">
        <p className="max-sm:text-sm">{title}</p>
        <p className="max-sm:text-sm font-bold">
          {currency && getCurrencySign(currency)}
          {price && numberWithCommas(price)}
        </p>
      </div>
      <div className="md:hidden flex-c gap-4 ">
        <p className="max-sm:text-sm">{title}</p>
        <p className="max-sm:text-sm font-bold whitespace-nowrap">
          {currency && getCurrencySign(currency)}
          {price && numberWithCommas(price)}
        </p>
      </div>
    </>
  );
};

export default CartPricing;
