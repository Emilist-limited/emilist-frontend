"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { GitCommitVertical } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type EarningsStatistic = {
  period: string;
  NGN: number;
  NGN_expenses: number;
  USD: number;
  USD_expenses: number;
  GBP: number;
  GBP_expenses: number;
  EUR: number;
  EUR_expenses: number;
};

interface AreaChartsProps {
  chartConfig: ChartConfig;
  chartData: EarningsStatistic[];
  title: string;
}

const AreaCharts = ({ chartConfig, chartData, title }: AreaChartsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.entries(chartConfig).map(([currency, config]) => (
              <Line
                key={currency}
                dataKey={currency}
                type="natural"
                stroke={config.color}
                strokeWidth={2}
                dot={({ cx, cy, payload }) => {
                  const r = 24;
                  return (
                    <GitCommitVertical
                      key={payload.period}
                      x={cx - r / 2}
                      y={cy - r / 2}
                      width={r}
                      height={r}
                      fill={config.color}
                      stroke={config.color}
                    />
                  );
                }}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AreaCharts;
