"use client";

import { RadialChart } from "@/components/organisms/Charts/RadialChart";
import { useGetTarget } from "../hooks/useGetTarget";

import PageLoader from "@/components/atoms/PageLoader";
import TargetReportCardWrapper from "./TargetReportCardWrapper";

const TargetReport = () => {
  const { loading, target } = useGetTarget();
  return (
    <div className="">
      {loading ? (
        <PageLoader height="h-[50vh]" />
      ) : (
        <>
          <h1 className="sm:text-3xl font-bold text-xl py-4">
            Your {target?.duration} target
          </h1>
          <div className="space-y-6">
            <TargetReportCardWrapper target={target} />
            <div className="w-full flex-c justify-center py-10 flex-col">
              <RadialChart percentage={target?.totalTargetPercentage} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TargetReport;
