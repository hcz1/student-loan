import { Metadata } from "next";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = {
  title:
    "Free UK Mortgage Calculator | Equity Growth Calculation | Estimate Your Home Loan Payments",
  description:
    "Calculate your mortgage payments with our easy-to-use mortgage calculator. Get instant estimates for monthly payments, interest, and more. Calculate your equity growth and loan breakdown.",
  keywords: [
    "mortgage calculator",
    "UK mortgage",
    "home loan",
    "monthly payments",
    "interest rates",
    "mortgage estimator",
    "equity growth",
    "loan breakdown",
    "property value",
    "property appreciation",
    "mortgage interest",
    "mortgage payment",
    "mortgage repayment",
    "mortgage amortization",
    "house equity growth",
    "equity growth calculator",
  ],
  openGraph: {
    title:
      "Free UK Mortgage Calculator | Equity Growth Calculation | Estimate Your Home Loan Payments",
    description:
      "Plan your home purchase with our accurate mortgage calculator. Get instant estimates for monthly payments, interest, and more. Calculate your equity growth and loan breakdown.",
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
