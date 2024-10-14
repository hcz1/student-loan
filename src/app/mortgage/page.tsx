import { Metadata } from "next";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description:
    "Calculate your mortgage payments with our easy-to-use mortgage calculator.",
  keywords:
    "mortgage calculator, UK mortgage, home loan, monthly payments, interest rates, mortgage estimator",
  openGraph: {
    title: "Free UK Mortgage Calculator | Estimate Your Home Loan Payments",
    description:
      "Plan your home purchase with our accurate mortgage calculator. Get instant estimates for monthly payments, interest, and more.",
    type: "website",
    url: "https://www.loantype.co.uk/mortgage",
  },
};

export default function MortgagePage() {
  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <MortgageCalculator />
    </div>
  );
}
