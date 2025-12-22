"use client";

import PageLoader from "@/components/atoms/PageLoader";
import SubscriptionCard from "./SubscriptionCard";

import { useGetUserPlan } from "../hooks/useGetUserPlan";

const SubscriptionOverviewWrapper = () => {
  const { loading, userPlan } = useGetUserPlan();

  return (
    <div className="">
      {loading ? (
        <PageLoader height="h-[60vh]" />
      ) : (
        <div>
          <SubscriptionCard userPlan={userPlan} />
        </div>
      )}
    </div>
  );
};

export default SubscriptionOverviewWrapper;
