import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

const Currency = ({ currency }: { currency: string }) => {
  return <span>{currency && getCurrencySign(currency)}</span>;
};

export default Currency;
