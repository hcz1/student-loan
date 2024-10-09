import { CalculationResult } from "@/types/loan";
import { Component } from "./charts/line-chart";
import { ComponentPieChart } from "./charts/pie-chart";
import { ChartConfig } from "./ui/chart";
import { formatCurrency } from "@/lib/format-currency";

interface ResultsChartProps {
  result: CalculationResult;
}
export const ResultsChart = ({ result }: ResultsChartProps) => {
  const { results, overpaymentAnnualPennies } = result;
  const chartConfigLine = {
    debt: {
      label: "Outstanding Loan",
      color: "hsl(var(--chart-1))",
    },
    paid: {
      label: "Cumulative Amount Paid",
      // color: "hsl(var(--chart-2))",
    },
    overpayment: {
      label: "Overpayment",
      // color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const data = results.map((result) => ({
    year: result.year.toString(),
    debt: result.outstandingAmount / 100,
    paid: result.cumulativeAmountPaid / 100,
    overpayment: result.outstandingAmountWithOverpayment / 100,
  }));

  const totalAmountPaid = results[results.length - 1].cumulativeAmountPaid;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Component
        data={data}
        title="Loan Repayment"
        description="Outstanding loan amount with accumulation"
        chartConfig={chartConfigLine}
        dataKey1={["year", "debt"]}
        dataKey2={["year", "paid"]}
      />
      <Component
        data={data}
        title="Loan Repayment"
        description={`Overpayment with ${formatCurrency(
          overpaymentAnnualPennies
        )} overpayment per year`}
        chartConfig={chartConfigLine}
        dataKey1={["year", "debt"]}
        dataKey2={["year", "overpayment"]}
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
