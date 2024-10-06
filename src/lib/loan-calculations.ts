import type { LoanDetails, CalculationResult, ResultRow } from "@/types/loan";

export function calculateRepayment(
  loanDetails: LoanDetails
): CalculationResult {
  const {
    loanBalance,
    loanType,
    grossSalary,
    courseStartYear,
    courseDuration,
  } = loanDetails;
  const balancePennies = Math.round(loanBalance * 100);
  const salaryPennies = Math.round(grossSalary * 100);
  let annualRepaymentPennies = 0;
  let thresholdPennies = 0;
  let writeOffYears = 30;
  let interestRate = 0.03; // Default interest rate, adjust as needed

  if (loanType === "plan1") {
    thresholdPennies = 2201500;
    writeOffYears = 25;
    interestRate = 0.015; // Example rate for Plan 1
  } else if (loanType === "plan2") {
    thresholdPennies = 2729500;
    writeOffYears = 30;
    interestRate = 0.07; // Example rate for Plan 2
  } else if (loanType === "plan4") {
    thresholdPennies = 2766000;
    writeOffYears = 30;
    interestRate = 0.05; // Example rate for Plan 4
  } else if (loanType === "plan5") {
    thresholdPennies = 2500000;
    writeOffYears = 40;
    interestRate = 0.06; // Example rate for Plan 5
  }

  if (salaryPennies > thresholdPennies) {
    annualRepaymentPennies = Math.round(
      (salaryPennies - thresholdPennies) * 0.09
    );
  }

  const monthlyPennies = Math.round(annualRepaymentPennies / 12);
  const monthlyRepayment = monthlyPennies / 100;

  // Generate results table data
  const results: ResultRow[] = [];
  let outstandingAmountPennies = balancePennies;
  let cumulativeAmountPaidPennies = 0;
  const graduationYear = courseStartYear + courseDuration;
  const currentYear = new Date().getFullYear();
  const writeOffYear = graduationYear + writeOffYears;
  let payoffYear = writeOffYear;

  for (let year = currentYear; year <= writeOffYear; year++) {
    const yearlyPaymentPennies = Math.min(
      annualRepaymentPennies,
      outstandingAmountPennies
    );
    cumulativeAmountPaidPennies += yearlyPaymentPennies;
    const interestPennies = Math.round(outstandingAmountPennies * interestRate);
    outstandingAmountPennies = Math.max(
      0,
      outstandingAmountPennies - yearlyPaymentPennies + interestPennies
    );

    results.push({
      year,
      outstandingAmount: outstandingAmountPennies,
      amountPaid: yearlyPaymentPennies,
      interestRate,
      cumulativeAmountPaid: cumulativeAmountPaidPennies,
    });

    if (outstandingAmountPennies === 0) {
      payoffYear = year;
      break;
    }
  }

  const payoffInfo =
    payoffYear < writeOffYear
      ? `Loan will be paid off in ${payoffYear}`
      : `Loan will be written off in ${writeOffYear}`;

  return {
    monthlyRepayment,
    payoffInfo,
    results,
  };
}
