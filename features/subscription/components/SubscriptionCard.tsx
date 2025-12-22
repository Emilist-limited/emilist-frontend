"use client";

import { useEffect, useState } from "react";

import { UserSubscription } from "../type";
import { convertDateFormat, numberWithCommas } from "@/lib/helpers";
import { ROUTES } from "@/lib/constants/routes";

import CustomButton from "@/components/atoms/CustomButton";

const SubscriptionCard = ({
  userPlan,
}: {
  userPlan: UserSubscription | null;
}) => {
  const [totalDays, setTotalDays] = useState<number>(0);
  const [elapsedDays, setElapsedDays] = useState<number>(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (!userPlan?.startDate || !userPlan?.endDate) return;

      const start = new Date(userPlan.startDate).getTime();
      const end = new Date(userPlan.endDate).getTime();
      const now = Date.now();

      if (isNaN(start) || isNaN(end) || end <= start) {
        setElapsedDays(0);
        setTotalDays(0);
        return;
      }

      // Calculate total days
      const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalDays(total);

      // Calculate elapsed days
      const elapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      setElapsedDays(Math.min(elapsed, total)); // Ensure elapsed doesn't exceed total
    };

    calculateProgress();
  }, [userPlan]);
  return (
    <div className="flex gap-6 max-lg:flex-col mt-6">
      <div className="w-full flex-1 shadow-md rounded-[10px] p-6">
        <div className="w-full flex justify-between">
          <h5 className="text-lg font-medium  max-sm:text-lg">
            {userPlan?.planId?.name}
          </h5>
          {userPlan?.planId?.price === 0 ? (
            <h5 className="text-3xl font-extrabold max-sm:text-2xl py-2">
              Free
            </h5>
          ) : (
            <h5 className="text-3xl font-extrabold max-sm:text-2xl py-2">
              ₦
              {userPlan?.planId?.price &&
                numberWithCommas(userPlan?.planId?.price)}
              <span className="text-[#6B7280] font-medium max-sm:text-sm font-inter">
                /
                {userPlan?.planId?.duration && userPlan?.planId?.duration > 30
                  ? "yr"
                  : "mo"}
              </span>
            </h5>
          )}
        </div>
        <div className="grid grid-cols-10 gap-5 mt-6">
          {userPlan?.planId?.price !== 0 && (
            <div className="col-span-6 w-full max-md:col-span-10">
              <h6 className="font-medium text-[#737774] max-sm:text-sm mb-1">
                {elapsedDays}/{totalDays}
              </h6>
              <div className="flex items-center w-full gap-4">
                <div className="flex-1">
                  <progress
                    className="progress lg:max-w-56 lg:w-full w-56"
                    value={elapsedDays}
                    max={totalDays}
                  ></progress>
                </div>
              </div>
            </div>
          )}
          <div
            className={`col-span-4 max-md:col-span-10 w-full flex max-md:justify-start ${
              userPlan?.planId?.price !== 0 ? "justify-end" : "justify-start"
            }`}
          >
            <CustomButton href={ROUTES.SUBSCRIPTION_PLANS}>
              Upgrade Plan
            </CustomButton>
          </div>
        </div>
      </div>
      {userPlan?.planId?.price !== 0 && (
        <div className="w-full flex-1 shadow-md rounded-[10px] p-6 flex items-center">
          <div className="">
            <p className="font-medium text-[#737774] max-sm:text-sm py-4">
              Next Payment
            </p>
            <h5 className="text-xl font-semibold max-sm:text-lg">
              on {userPlan?.endDate && convertDateFormat(userPlan?.endDate)}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
