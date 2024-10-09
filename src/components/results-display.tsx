import { formatCurrency } from "@/lib/format-currency";
import type { CalculationResult } from "@/types/loan";

interface ResultsDisplayProps {
  result: CalculationResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { monthlyRepayment, payoffInfo, results } = result;
  const totalAmountPaid = results[results.length - 1].cumulativeAmountPaid;
  return (
    <div className="p-4 border-8 border-black bg-white">
      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Total Amount Paid:
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency(totalAmountPaid)}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Yearly Repayments :
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency(monthlyRepayment * 100 * 12)}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Monthly Repayment:
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency(monthlyRepayment * 100)}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Weekly Repayment:
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency((monthlyRepayment * 100) / 4)}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Loan Status:
        </h2>
        <p className="text-2xl font-bold font-mono text-[rgba(0,0,255,1)]">
          {payoffInfo}
        </p>
      </div>
    </div>
  );
}
