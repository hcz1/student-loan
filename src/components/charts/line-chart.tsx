"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export function Component({
  data,
  title,
  description,
  chartConfig,
  dataKey1,
  dataKey2,
  footerHeader,
  footerDescription,
}: {
  data: any;
  title: string;
  description: string;
  chartConfig: ChartConfig;
  dataKey1: string[];
  dataKey2: string[];
  footerHeader: string;
  footerDescription: React.ReactNode;
}) {
  return (
    <Card className="border-4 border-black ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={dataKey1[0]} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey={dataKey1[1]}
              type="natural"
              stroke={chartConfig[dataKey1[1]].color}
              strokeWidth={2}
              label={dataKey1[1]}
            />
            <Line
              dataKey={dataKey2[1]}
              type="natural"
              stroke={chartConfig[dataKey2[1]].color}
              strokeWidth={2}
              label={dataKey2[1]}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {footerHeader}
        </div>
        <div className="leading-none text-muted-foreground">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
}
