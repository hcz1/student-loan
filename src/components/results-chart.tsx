import { CalculationResult } from "@/types/loan";
import { Component } from "./charts/line-chart";
import { ComponentPieChart } from "./charts/pie-chart";
import { ChartConfig } from "./ui/chart";

interface ResultsChartProps {
  result: CalculationResult;
}
export const ResultsChart = ({ result }: ResultsChartProps) => {
  const { results } = result;
  const totalAmountPaid = results[results.length - 1].cumulativeAmountPaid;
  const data = results.map((result) => ({
    month: result.year.toString(),
    desktop: result.outstandingAmount / 100,
  }));

  const interest = result.results.reduce(
    (acc, curr) => acc + curr.annualInterest,
    0
  );

  const chartData = [
    {
      label: "interest",
      amount: interest / 100,
      fill: "var(--color-interest)",
    },
    {
      label: "originalAmount",
      amount: (totalAmountPaid - interest) / 100,
      fill: "var(--color-originalAmount)",
    },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    interest: {
      label: "Interest",
      color: "hsl(var(--chart-1))",
    },
    originalAmount: {
      label: "Original Amount",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Component
        data={data}
        title="Loan Repayment"
        description="Outstanding loan amount"
      />
      <ComponentPieChart
        title="Breakdown of Loan"
        description="Interest and original amount"
        chartData={chartData}
        center={totalAmountPaid / 100}
        chartConfig={chartConfig}
        dataKey="amount"
        nameKey="label"
      />
    </div>
  );
};
