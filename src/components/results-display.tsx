import { formatCurrency } from "@/lib/format-currency";
import type { CalculationResult } from "@/types/loan";

interface ResultsDisplayProps {
  result: CalculationResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { monthlyRepayment, payoffInfo, results } = result;

  return (
    <div className="p-4 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,255,0.3)]">
      <h2 className="text-2xl font-bold mb-2">Monthly Repayment:</h2>
      <p className="text-3xl font-bold mb-4">
        {formatCurrency(monthlyRepayment * 100)}
      </p>
      <h2 className="text-2xl font-bold mb-2">Loan Status:</h2>
      <p className="text-xl font-bold">{payoffInfo}</p>
    </div>
  );
}