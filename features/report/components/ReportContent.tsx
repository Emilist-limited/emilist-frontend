"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import ReportHeader from "./ReportHeader";
import JobReport from "./JobReport";
import ProjectReport from "./ProjectReport";
import InsightReport from "./InsightReport";
import EarningsReport from "./EarningsReport";
import TargetReport from "./TargetReport";

const ReportContent = () => {
  const searchParams = useSearchParams();

  const report = searchParams.get("r");

  const [currentLink, setCurrentLink] = useState(report || "Jobs");

  return (
    <div className="bg-white w-full p-6 max-sm:px-3 my-6">
      <ReportHeader currentLink={currentLink} setCurrentLink={setCurrentLink} />
      {currentLink === "Jobs" && <JobReport />}
      {currentLink === "Projects" && <ProjectReport />}
      {currentLink === "Insights" && <InsightReport />}
      {currentLink === "Earning" && <EarningsReport />}
      {currentLink === "Target" && <TargetReport />}
    </div>
  );
};

export default ReportContent;
