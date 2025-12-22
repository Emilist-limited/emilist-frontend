"use client";

import { ChartConfig } from "@/components/ui/chart";

import { currencyLabel } from "@/lib/constants";
import { useGetEarningsAnalytics } from "../hooks/useGetEarningsAnalytics";

import EarningsCardWrapper from "./EarningsCardWrapper";
import MonthYearSelectComponent from "@/components/molecules/MonthYearSelectComponent";
import PageLoader from "@/components/atoms/PageLoader";
import AreaCharts from "@/components/organisms/Charts/AreaCharts";

const chartConfig = {
  NGN: {
    label: "Naira",
    color: "#054753",
  },
  USD: {
    label: "Dollar",
    color: "#9ef769",
  },
  GBP: {
    label: "Pounds",
    color: "#ff9933",
  },
  EUR: {
    label: "Euro",
    color: "#fee300",
  },
} satisfies ChartConfig;

const chartConfig1 = {
  NGN_expenses: {
    label: "Naira",
    color: "#054753",
  },
  USD_expenses: {
    label: "Dollar",
    color: "#9ef769",
  },
  GBP_expenses: {
    label: "Pounds",
    color: "#ff9933",
  },
  EUR_expenses: {
    label: "Euro",
    color: "#fee300",
  },
} satisfies ChartConfig;

const EarningsReport = () => {
  const { isLoad, earnings, currency, setCurrency, year, setYear } =
    useGetEarningsAnalytics();

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
  };
  const handleYearChange = (value: string) => {
    setYear(value);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div>
      {isLoad ? (
        <PageLoader height="h-[50vh]" />
      ) : (
        <>
          <EarningsCardWrapper
            earnings={earnings}
            timeFrame={year || currentYear}
          />
          <MonthYearSelectComponent
            month={currency}
            year={year}
            handleMonthChange={handleCurrencyChange}
            handleYearChange={handleYearChange}
            options={currencyLabel}
            placeholder="Filter by currency"
          />
          <div className="py-10 space-y-10">
            <AreaCharts
              chartData={earnings?.earningsStatistics}
              chartConfig={chartConfig1}
              title="Expenses"
            />
            <AreaCharts
              chartData={earnings?.earningsStatistics}
              chartConfig={chartConfig}
              title="Earnings"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EarningsReport;
