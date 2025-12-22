"use client";

import { ChartConfig } from "@/components/ui/chart";

import BarCharts from "@/components/organisms/Charts/BarCharts";
import JobSummaryWrapper from "@/features/jobs/components/JobSummaryWrapper";
import MonthYearSelectComponent from "@/components/molecules/MonthYearSelectComponent";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

import { useJobAnalytics } from "../hooks/useJobAnalytics";
import { months } from "@/lib/constants";

const chartConfigLead = {
  totalOverdueJobs: {
    label: "Lead jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigNew = {
  totalJobs: {
    label: "New jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigActive = {
  totalActiveJobs: {
    label: "Active jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigPaused = {
  totalPausedJobs: {
    label: "Paused  jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigOverdue = {
  totalOverdueJobs: {
    label: "Overdue jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const chartConfigCompleted = {
  totalCompletedJobs: {
    label: "Completed jobs",
    color: "#25C269",
  },
} satisfies ChartConfig;

const JobReport = () => {
  const { isLoading, jobAnalytics, setMonth, setYear, month, year } =
    useJobAnalytics();

  const handleMonthChange = (value: string) => {
    setMonth(value);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
  };

  return (
    <div>
      <JobSummaryWrapper />
      <MonthYearSelectComponent
        month={month}
        year={year}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        options={months}
      />
      {isLoading ? (
        <NoMoreMessage message="Loading..." />
      ) : (
        <div className="flex w-full gap-4 py-4 max-w-full flex-wrap">
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={jobAnalytics}
              title="Leads"
              chartConfig={chartConfigLead}
              dataKey="totalOverdueJobs"
            />
          </div>
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={jobAnalytics}
              title="New Jobs"
              chartConfig={chartConfigNew}
              dataKey="totalJobs"
            />
          </div>
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={jobAnalytics}
              title="Active Jobs"
              chartConfig={chartConfigActive}
              dataKey="totalActiveJobs"
            />
          </div>
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={jobAnalytics}
              title="Paused Jobs"
              chartConfig={chartConfigPaused}
              dataKey="totalPausedJobs"
            />
          </div>
          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={jobAnalytics}
              title="Overdue Jobs"
              chartConfig={chartConfigOverdue}
              dataKey="totalOverdueJobs"
            />
          </div>

          <div className="max-w-[430px] w-full min-w-[300px]">
            <BarCharts
              chartData={jobAnalytics}
              title="Completed Jobs"
              chartConfig={chartConfigCompleted}
              dataKey="totalCompletedJobs"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobReport;
