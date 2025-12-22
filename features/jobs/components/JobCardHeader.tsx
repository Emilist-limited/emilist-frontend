import Currency from "@/components/atoms/Currency";
import { Capitalize, numberWithCommas } from "@/lib/helpers";

interface JobCardHeaderProps {
  title: string;
  amount: number;
  jobType: string;
  currency: string;
}

const JobCardHeader = ({
  title,
  jobType,
  amount,
  currency,
}: JobCardHeaderProps) => {
  return (
    <div className="flex-c-b w-full gap-8">
      <h2 className="sm:text-lg font-semibold group-hover:text-primary-green whitespace-nowrap truncate">
        {title && Capitalize(title)}
      </h2>
      <div className="flex-c justify-end gap-3 max-sm:gap-2 ">
        <h6 className=" text-sm font-medium max-sm:text-xs whitespace-nowrap">
          {jobType === "biddable" ? "Max price" : "Budget"}:{" "}
          <Currency currency={currency} />
          {amount && numberWithCommas(amount)}
        </h6>
      </div>
    </div>
  );
};

export default JobCardHeader;
