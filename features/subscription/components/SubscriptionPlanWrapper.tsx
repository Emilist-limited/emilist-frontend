"use client";

import { useGetSubscriptionPlans } from "../hooks/useGetSubscriptionPlans";

import PlanHeader from "./PlanHeader";
import PlanCardWrapper from "./PlanCardWrapper";

const SubscriptionPlanWrapper = () => {
  const { plans, isLoading, planType, setPlanType } = useGetSubscriptionPlans();

  return (
    <div>
      <PlanHeader planType={planType} setPlanType={setPlanType} />
      <PlanCardWrapper
        plans={plans}
        planType={planType}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SubscriptionPlanWrapper;
