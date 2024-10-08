import { CalculationResult } from "@/types/loan";
import { Component } from "./charts/line-chart";

interface ResultsChartProps {
  result: CalculationResult;
}
export const ResultsChart = ({ result }: ResultsChartProps) => {
  const { results } = result;

  const data = results.map((result) => ({
    month: result.year.toString(),
    desktop: result.outstandingAmount / 100,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Component
        data={data}
        title="Outstanding Loan"
        description="Outstanding Loan"
      />
      <Component
        data={data}
        title="Outstanding Loan"
        description="Outstanding Loan"
      />
    </div>
  );
};
