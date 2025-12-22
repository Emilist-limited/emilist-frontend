import Image from "next/image";

import { convertDateFormat, numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

interface MilestonePaymentInfoProps {
  currency?: string;
  amountPaid?: number;
  paymentMethod?: string;
  date?: Date;
}

const MilestonePaymentInfo = ({
  currency,
  amountPaid,
  paymentMethod,
  date,
}: MilestonePaymentInfoProps) => {
  return (
    <div className="flex gap-4 py-6">
      <Image
        src="/icons/tick-circle.svg"
        alt="tick circle icon"
        width={20}
        height={20}
        className="w-8 h-8"
      />
      <div className="space-y-2">
        <h6 className="text-2xl font-bold">Paid</h6>
        <p className="">
          {currency && getCurrencySign(currency)}{" "}
          {amountPaid && numberWithCommas(amountPaid)} (
          {paymentMethod && paymentMethod})
        </p>
        <p className="flex items-center gap-1">
          <Image
            src="/icons/calendar-2.svg"
            alt="calendar"
            width={14}
            height={14}
            className="w-5 h-5"
          />{" "}
          {date && convertDateFormat(date)}
        </p>
      </div>
    </div>
  );
};

export default MilestonePaymentInfo;
