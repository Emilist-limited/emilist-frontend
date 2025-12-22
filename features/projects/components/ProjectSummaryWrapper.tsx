"use client";

import SummaryCard from "@/components/molecules/cards/SummaryCard";
import SummaryCardSkeleton from "@/components/molecules/skeletonLoaders/SummaryCardSkeleton";

import { ROUTES } from "@/lib/constants/routes";
import { numberWithCommas } from "@/lib/helpers";
import { useGetProjectAnalytics } from "../hooks/useGetProjectAnalytics";

const ProjectSummaryWrapper = () => {
  const { loading, projectAnalytics } = useGetProjectAnalytics();

  return (
    <div className="flex w-full gap-4 py-4 max-w-full flex-wrap">
      {loading ? (
        <SummaryCardSkeleton />
      ) : (
        <>
          <SummaryCard
            cardIcon="/icons/newIcon.svg"
            cardLink={ROUTES?.DASHBOARD_PROJECT_NEW}
            cardSum={
              projectAnalytics?.totalPendingProjects &&
              numberWithCommas(projectAnalytics?.totalPendingProjects)
            }
            cardTitle="New"
          />
          <SummaryCard
            cardIcon="/icons/activeIcon.svg"
            cardLink={ROUTES?.DASHBOARD_PROJECT_ACTIVE}
            cardSum={
              projectAnalytics?.totalActiveProjects &&
              numberWithCommas(projectAnalytics?.totalActiveProjects)
            }
            cardTitle="Active"
          />
          <SummaryCard
            cardIcon="/icons/overdueIcon.svg"
            cardLink={ROUTES?.DASHBOARD_PROJECT_OVERDUE}
            cardSum={
              projectAnalytics?.totalOverdueProjects &&
              numberWithCommas(projectAnalytics?.totalOverdueProjects)
            }
            cardTitle="Overdue"
          />
          <SummaryCard
            cardIcon="/icons/pausedIcon.svg"
            cardLink={ROUTES?.DASHBOARD_PROJECT_PAUSED}
            cardSum={
              projectAnalytics?.totalPausedProjects &&
              numberWithCommas(projectAnalytics?.totalPausedProjects)
            }
            cardTitle="Paused"
          />
          <SummaryCard
            cardIcon="/icons/completedIcon.svg"
            cardLink={ROUTES?.DASHBOARD_PROJECT_COMPLETE}
            cardSum={
              projectAnalytics?.totalCompletedProjects &&
              numberWithCommas(projectAnalytics?.totalCompletedProjects)
            }
            cardTitle="Completed"
          />
        </>
      )}
    </div>
  );
};

export default ProjectSummaryWrapper;
