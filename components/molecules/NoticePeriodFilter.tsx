import Image from "next/image";

import { noticePeriodOptions } from "@/lib/constants";

import FilterHeading from "../atoms/FilterHeading";

interface NoticePeriodFilterProps {
  noticePeriod: number | undefined;
  setNoticePeriod: (notice: number) => void;
  fetchData: () => Promise<void>;
}

const NoticePeriodFilter = ({
  noticePeriod,
  setNoticePeriod,
  fetchData,
}: NoticePeriodFilterProps) => {
  return (
    <div className="w-full  border-b-1 py-6">
      <FilterHeading title="Notice Period" />
      <div className="flex flex-col gap-4 mt-3">
        {noticePeriodOptions?.map((period, index) => (
          <div
            className="flex-c cursor-pointer"
            key={index}
            onClick={() => {
              setNoticePeriod(period?.value);
            }}
          >
            <Image
              src={
                noticePeriod === period?.value
                  ? "/icons/circle-color.svg"
                  : "/icons/circle.svg"
              }
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-6 h-6"
            />{" "}
            <label htmlFor="all" className="ml-3">
              {period?.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticePeriodFilter;
