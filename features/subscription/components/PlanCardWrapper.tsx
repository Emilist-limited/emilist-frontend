"use client";

import { Plan } from "../type";

import PlanCard from "./PlanCard";
import PageLoader from "@/components/atoms/PageLoader";

const PlanCardWrapper = ({
  plans,
  planType,
  isLoading,
}: {
  plans: Plan[];
  planType: "monthly" | "yearly";
  isLoading: boolean;
}) => {
  return (
    <div className="w-full flex gap-5 overflow-x-scroll mt-6">
      {isLoading ? (
        <div className="flex-c justify-center w-full">
          <PageLoader height="h-[40vh]" />
        </div>
      ) : (
        <>
          {plans?.map((plan: Plan) => (
            <PlanCard plan={plan} key={plan?._id} planType={planType} />
          ))}
        </>
      )}
    </div>
  );
};

export default PlanCardWrapper;
