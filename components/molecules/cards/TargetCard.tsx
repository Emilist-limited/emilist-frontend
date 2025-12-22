"use client";

import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";
import { numberWithCommas } from "@/lib/helpers";
import { useGetTarget } from "@/features/report/hooks/useGetTarget";

import DashboardCardSkeleton from "../skeletonLoaders/DashboardCardSkeleton";
import ProgressBarWrapper from "../ProgressBarWrapper";

const TargetCard = () => {
  const { loading, target } = useGetTarget();

  return (
    <>
      {loading ? (
        <DashboardCardSkeleton />
      ) : (
        <div className="bg-white w-full rounded-lg p-6 max-sm:px-3 max-sm:min-w-min">
          <h4 className="sm:text-lg font-medium">
            Your Target for this{" "}
            {target?.duration === "monthly" ? "month" : "year"}
          </h4>
          <div className="flex flex-col gap-4 my-5 ">
            <div className="flex flex-col gap-4 max-lg:flex-row max-lg:items-center w-full">
              <ProgressBarWrapper
                title="Jobs"
                percentage={
                  target?.jobs?.percentage
                    ? numberWithCommas(target?.jobs?.percentage)
                    : 0
                }
                barStyle="progress-primary lg:max-w-56 lg:w-full w-56"
              />
              <ProgressBarWrapper
                title="Amount earned"
                percentage={
                  target?.amount?.percentage
                    ? numberWithCommas(target?.amount?.percentage)
                    : 0
                }
                barStyle="progress-warning lg:max-w-56 lg:w-full w-56"
              />
            </div>
            <div className="flex flex-col gap-4 max-lg:flex-row max-lg:items-center w-full">
              <ProgressBarWrapper
                title="Clients referring you"
                percentage={
                  target?.referrals?.percentage
                    ? numberWithCommas(target?.referrals?.percentage)
                    : 0
                }
                barStyle="progress-success lg:max-w-56 lg:w-full w-56"
              />
              <ProgressBarWrapper
                title="Friends invited"
                percentage={
                  target?.invites?.percentage
                    ? numberWithCommas(target?.invites?.percentage)
                    : 0
                }
                barStyle="progress-error lg:max-w-56 lg:w-full w-56"
              />
            </div>
            <div className="flex-c w-full justify-center max-sm:justify-start">
              <Link
                href={ROUTES?.REPORTS}
                className="text-sm font-semibold text-primary-green max-sm:text-xs"
              >
                See More
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TargetCard;
