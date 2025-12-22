"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface BarChartsProps {
  chartData: any;
  title: string;
  chartConfig: any;
  dataKey: string;
}

const BarCharts = ({
  chartData,
  title,
  chartConfig,
  dataKey,
}: BarChartsProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="sm:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="w-full p-4">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey={dataKey} fill="#25C269" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarCharts;
