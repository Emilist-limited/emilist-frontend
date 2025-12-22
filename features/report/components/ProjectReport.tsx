"use client";

import { ChartConfig } from "@/components/ui/chart";

import { useProjectAnalytics } from "../hooks/useProjectAnalytics";

import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import MonthYearSelectComponent from "@/components/molecules/MonthYearSelectComponent";
import BarCharts from "@/components/organisms/Charts/BarCharts";
import ProjectSummaryWrapper from "@/features/projects/components/ProjectSummaryWrapper";
import { months } from "@/lib/constants";

const chartConfigNew = {
  totalProjects: {
    label: "New projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigActive = {
  totalActiveProjects: {
    label: "Active projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigPaused = {
  totalPausedProjects: {
    label: "Paused  projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigOverdue = {
  totalOverdueProjects: {
    label: "Overdue projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigCompleted = {
  totalCompletedProjects: {
    label: "Completed projects",
    color: "#25C269",
  },
} satisfies ChartConfig;

const ProjectReport = () => {
  const { isLoading, projectAnalytics, setMonth, setYear, month, year } =
    useProjectAnalytics();

  const handleMonthChange = (value: string) => {
    setMonth(value);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
  };

  return (
    <div>
      <ProjectSummaryWrapper />
      <MonthYearSelectComponent
        month={month}
        year={year}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        options={months}
      />
      {isLoading ? (
        <div className="py-4">
          <NoMoreMessage message="Loading..." />
        </div>
      ) : (
        <div className="flex w-full gap-4 py-4 max-w-full flex-wrap">
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={projectAnalytics}
              title="New Projects"
              chartConfig={chartConfigNew}
              dataKey="totalProjects"
            />
          </div>
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={projectAnalytics}
              title="Active Projects"
              chartConfig={chartConfigActive}
              dataKey="totalActiveProjects"
            />
          </div>
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={projectAnalytics}
              title="Paused Projects"
              chartConfig={chartConfigPaused}
              dataKey="totalPausedProjects"
            />
          </div>
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={projectAnalytics}
              title="Overdue Projects"
              chartConfig={chartConfigOverdue}
              dataKey="totalOverdueProjects"
            />
          </div>

          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={projectAnalytics}
              title="Completed Projects"
              chartConfig={chartConfigCompleted}
              dataKey="totalCompletedProjects"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectReport;
