import { Metadata } from "next";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator | UK Student Loan Repayment Calculator",
  description:
    "Calculate your mortgage payments with our easy-to-use mortgage calculator.",
};

export default function MortgagePage() {
  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <MortgageCalculator />
    </div>
  );
}
