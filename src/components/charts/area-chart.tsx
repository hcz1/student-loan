"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

interface ComponentProps<T> {
  title: string;
  description: string;
  headerActions?: React.ReactNode;
  chartData: T[];
  chartConfig: ChartConfig;
  dataKeys: string[];
  footerHeader: string;
  footerDescription: React.ReactNode;
}

export function ComponentAreaChart<T>({
  title,
  description,
  headerActions,
  chartData,
  chartConfig,
  dataKeys,
  footerHeader,
  footerDescription,
}: ComponentProps<T>) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {headerActions}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              label={{
                value: "£ (thousands)",
                position: "insideLeft",
                offset: 10,
                angle: -90,
              }}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-GB", {}).format(value / 1000)
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            {dataKeys.map((dataKey) => (
              <Area
                key={dataKey}
                dataKey={dataKey}
                type="monotone"
                fill={chartConfig[dataKey].color}
                fillOpacity={0.4}
                stroke={chartConfig[dataKey].color}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {footerHeader}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {footerDescription}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
