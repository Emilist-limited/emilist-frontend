import Image from "next/image";

import { Plan } from "../type";
import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { useSubNewPlan } from "../hooks/useSubNewPlan";

import CustomButton from "@/components/atoms/CustomButton";
import SubscriptionPaymentModal from "@/components/organisms/modal/SubscriptionPaymentModal";

interface PlanCardProps {
  plan: Plan;
  planType: "monthly" | "yearly";
}

const PlanCard = ({ plan, planType }: PlanCardProps) => {
  const {
    isOpen,
    setIsOpen,
    currency,
    setCurrency,
    loading,
    paymentMethod,
    setPaymenntMethod,
    handleSubNewPlan,
  } = useSubNewPlan();

  const onSubmit = (e: React.FormEvent) => {
    handleSubNewPlan(e, plan?._id, false, planType);
  };

  return (
    <>
      <div className="min-h-[620px] max-w-sm w-full min-w-[286px] border-1 border-[#E5E7EB] rounded-md">
        <div className="w-full border-b-1 border-[#E5E7EB] p-5">
          <h5 className=" text-xl font-medium  max-sm:text-lg">
            {plan?.name && Capitalize(plan?.name)}
          </h5>
          <p className="text-[#303632]  text-sm max-sm:text-xs py-4">
            All the basics for starting a new business
          </p>
          {plan?.price === 0 ? (
            <h5 className=" text-3xl font-extrabold  max-sm:text-2xl">Free</h5>
          ) : (
            <h5 className=" text-3xl font-extrabold  max-sm:text-2xl py-2">
              {plan?.price && ` ₦${numberWithCommas(plan?.price)}`}
              <span className="text-[#6B7280]  text-[16px] font-[500] leading-[24px] max-sm:text-sm max-sm:leading-[18px] font-inter">
                /{planType === "yearly" ? "yr" : "mo"}
              </span>
            </h5>
          )}

          {plan?.price !== 0 && (
            <CustomButton className="w-full" onClick={() => setIsOpen(true)}>
              Buy Startup
            </CustomButton>
          )}
        </div>
        <div className="w-full p-5">
          <h5 className="  text-sm font-semibold max-sm:text-xs uppercase">
            What’s included
          </h5>
          <div className="flex flex-col gap-4 mt-6">
            {plan?.offers?.map((offer: any, index: number) => (
              <div className="flex items-start gap-2" key={index}>
                <Image
                  src="/icons/Icon.svg"
                  alt="good"
                  width={14}
                  height={10}
                  className="object-contain w-3 h-3 mt-1"
                />
                <p className="text-[#6B7280]  text-sm max-sm:text-xs">
                  {offer?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SubscriptionPaymentModal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        amount={plan?.price}
        currency={currency}
        setPaymentMethod={setPaymenntMethod}
        paymentMethod={paymentMethod}
        setCurrency={setCurrency}
        handleSubNewPlan={onSubmit}
        planId={plan?._id}
        loading={loading}
      />
    </>
  );
};

export default PlanCard;
