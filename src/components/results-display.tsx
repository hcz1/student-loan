import { useState } from "react";
import { formatCurrency } from "@/lib/format-currency";
import type { CalculationResult } from "@/types/loan";
import { Switch } from "@/components/ui/switch";

interface ResultsDisplayProps {
  result: CalculationResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const [showOverpayment, setShowOverpayment] = useState(false);
  const {
    monthlyRepayment,
    results,
    monthlyRepaymentWithOverpayment,
    percentageSaving,
    overpaymentAnnualPennies,
  } = result;
  const totalAmountPaid = results[results.length - 1].cumulativeAmountPaid;
  const totalAmountPaidWithOverpayment =
    results[results.length - 1].cumulativeAmountPaidWithOverpayment;

  return (
    <div className="p-4 border-8 border-black bg-white">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold uppercase underline">Results</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-right">
            Show {formatCurrency(overpaymentAnnualPennies / 12)} / month
            Overpayment
          </span>
          <Switch
            checked={showOverpayment}
            onCheckedChange={setShowOverpayment}
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Total Amount Paid:
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency(totalAmountPaid)}
        </p>
        {showOverpayment && (
          <div className="text-sm text-green-600 font-bold mt-1">
            <p>
              With overpayment: {formatCurrency(totalAmountPaidWithOverpayment)}
            </p>
            <p>
              Saving:{" "}
              {formatCurrency(totalAmountPaid - totalAmountPaidWithOverpayment)}{" "}
              ({percentageSaving.toFixed(2)}%)
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Yearly Repayments (this year):
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency(monthlyRepayment * 12)}
        </p>
        {showOverpayment && (
          <div className="text-sm text-green-600 font-bold mt-1">
            <p>
              With overpayment:{" "}
              {formatCurrency(monthlyRepaymentWithOverpayment * 12)}
            </p>
            <p>
              Overpayment amount: {formatCurrency(overpaymentAnnualPennies)}
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Monthly Repayment (this year):
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency(monthlyRepayment)}
        </p>
        {showOverpayment && (
          <p className="text-sm text-green-600 font-bold mt-1">
            With overpayment: {formatCurrency(monthlyRepaymentWithOverpayment)}
          </p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase mb-1 border-b-3 border-black pb-1">
          Weekly Repayment (this year):
        </h2>
        <p className="text-3xl font-mono text-[rgba(0,0,255,1)]">
          {formatCurrency(monthlyRepayment / 4)}
        </p>
        {showOverpayment && (
          <p className="text-sm text-green-600 font-bold mt-1">
            With overpayment:{" "}
            {formatCurrency(monthlyRepaymentWithOverpayment / 4)}
          </p>
        )}
      </div>
    </div>
  );
}
