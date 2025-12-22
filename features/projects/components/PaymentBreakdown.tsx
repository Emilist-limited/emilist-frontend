import { Milestone } from "@/features/jobs/types";
import { convertDateFormat, numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

interface PaymentBreakdownProps {
  currency: string;
  currentMilestone: Milestone;
}

const PaymentBreakdown = ({
  currency,
  currentMilestone,
}: PaymentBreakdownProps) => {
  return (
    <div className=" flex gap-4 py-6 text-[#282828]">
      <div className="flex gap-4">
        <img src="/icons/tick-circle.svg" alt="" className="w-8 h-8" />
        <div className="">
          <h6 className="text-2xl font-bold capitalize">
            {currentMilestone?.paymentStatus}
          </h6>
          <p className="py-3">
            {currency && getCurrencySign(currency)}
            {currentMilestone?.paymentInfo?.amountPaid &&
              numberWithCommas(currentMilestone?.paymentInfo?.amountPaid)}{" "}
            ({currentMilestone?.paymentInfo?.paymentMethod})
          </p>
          <p className="flex items-center">
            <img
              src="/icons/calendar-2.svg"
              alt="calendar"
              className="w-5 h-5 mr-1"
            />{" "}
            {currentMilestone?.paymentInfo?.date &&
              convertDateFormat(currentMilestone?.paymentInfo?.date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentBreakdown;
