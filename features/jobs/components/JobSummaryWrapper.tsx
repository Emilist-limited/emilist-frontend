"use client";

import SummaryCard from "@/components/molecules/cards/SummaryCard";
import SummaryCardSkeleton from "@/components/molecules/skeletonLoaders/SummaryCardSkeleton";

import { ROUTES } from "@/lib/constants/routes";
import { numberWithCommas } from "@/lib/helpers";
import { useGetJobSummary } from "../hooks/useGetJobSummary";

const JobSummaryWrapper = () => {
  const { loadingAnalytics, jobAnalytics } = useGetJobSummary();
  return (
    <div className="flex w-full gap-4 py-4 max-w-full flex-wrap">
      {loadingAnalytics ? (
        <SummaryCardSkeleton />
      ) : (
        <>
          <SummaryCard
            cardIcon="/icons/leadIcon.svg"
            cardLink={ROUTES?.DASHBOARD_JOB_LEAD}
            cardSum={0}
            cardTitle="Lead"
          />
          <SummaryCard
            cardIcon="/icons/newIcon.svg"
            cardLink={ROUTES?.DASHBOARD_JOB_NEW}
            cardSum={
              jobAnalytics?.totalPendingJobs &&
              numberWithCommas(jobAnalytics?.totalPendingJobs)
            }
            cardTitle="New"
          />
          <SummaryCard
            cardIcon="/icons/activeIcon.svg"
            cardLink={ROUTES?.DASHBOARD_JOB_ACTIVE}
            cardSum={
              jobAnalytics?.totalActiveJobs &&
              numberWithCommas(jobAnalytics?.totalActiveJobs)
            }
            cardTitle="Active"
          />
          <SummaryCard
            cardIcon="/icons/overdueIcon.svg"
            cardLink={ROUTES?.DASHBOARD_JOB_OVERDUE}
            cardSum={
              jobAnalytics?.totalOverdueJobs &&
              numberWithCommas(jobAnalytics?.totalOverdueJobs)
            }
            cardTitle="Overdue"
          />
          <SummaryCard
            cardIcon="/icons/pausedIcon.svg"
            cardLink={ROUTES?.DASHBOARD_JOB_PAUSED}
            cardSum={
              jobAnalytics?.totalPausedJobs &&
              numberWithCommas(jobAnalytics?.totalPausedJobs)
            }
            cardTitle="Paused"
          />
          <SummaryCard
            cardIcon="/icons/completedIcon.svg"
            cardLink={ROUTES?.DASHBOARD_JOB_COMPLETED}
            cardSum={
              jobAnalytics?.totalCompletedJobs &&
              numberWithCommas(jobAnalytics?.totalCompletedJobs)
            }
            cardTitle="Completed"
          />
        </>
      )}
    </div>
  );
};

export default JobSummaryWrapper;
