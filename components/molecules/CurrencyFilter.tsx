import Image from "next/image";

import { currencies } from "@/lib/constants";

import FilterHeading from "../atoms/FilterHeading";

interface CurrencyFilterProps {
  currency: string;
  setCurrency: (currency: string) => void;
  fetchData: () => Promise<void>;
}

const CurrencyFilter = ({
  currency,
  setCurrency,
  fetchData,
}: CurrencyFilterProps) => {
  return (
    <div className="w-full border-b-1 py-6">
      <FilterHeading title="Currencies" />
      <div className="flex flex-col gap-4 my-3">
        {currencies.map((curr) => (
          <div
            className="flex items-center gap-4 cursor-pointer"
            key={curr}
            onClick={() => setCurrency(curr)}
          >
            <Image
              src={
                currency === curr
                  ? "/icons/circle-color.svg"
                  : "/icons/circle.svg"
              }
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-6 h-6"
            />

            <span>{curr}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyFilter;
