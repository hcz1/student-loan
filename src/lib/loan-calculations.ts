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
    interestRate: interestRateParam,
    salaryIncreasePercentage,
  } = loanDetails;
  const balancePennies = Math.round(loanBalance * 100);
  let salaryPennies = Math.round(grossSalary * 100);
  const salaryIncrease = salaryIncreasePercentage / 100;
  let annualRepaymentPennies = 0;
  let thresholdPennies = 0;
  let writeOffYears = 30;
  let repaymentRate = 0.09; // Default repayment rate
  let interestRate = 0.043; // Default interest rate

  if (loanType === "1") {
    thresholdPennies = 2499000; // £24,990
    writeOffYears = 25;
    interestRate = 0.043;
    repaymentRate = 0.09;
  } else if (loanType === "2") {
    thresholdPennies = 2729500; // £27,295
    writeOffYears = 30;
    repaymentRate = 0.09;
    // Interest rate will be calculated based on income
  } else if (loanType === "4") {
    thresholdPennies = 3139500; // £31,395
    writeOffYears = 30;
    interestRate = 0.043;
    repaymentRate = 0.09;
  } else if (loanType === "plan5") {
    thresholdPennies = 2500000; // £25,000
    writeOffYears = 40;
    interestRate = 0.043;
    repaymentRate = 0.09;
  } else if (loanType === "postgraduate") {
    thresholdPennies = 2100000; // £21,000
    writeOffYears = 30;
    interestRate = 0.073;
    repaymentRate = 0.06;
  }

  if (interestRateParam) {
    interestRate = interestRateParam / 100;
  }

  const results: ResultRow[] = [];
  let outstandingAmountPennies = balancePennies;
  let cumulativeAmountPaidPennies = 0;
  const graduationYear = courseStartYear + courseDuration;
  const currentYear = new Date().getFullYear();
  const writeOffYear = graduationYear + writeOffYears;
  let payoffYear = writeOffYear;

  for (let year = currentYear; year <= writeOffYear; year++) {
    // Increase salary annually
    if (year > currentYear) {
      salaryPennies += Math.round(salaryPennies * salaryIncrease);
    }

    // Update interest rate for Plan 2 based on income
    if (loanType === "2") {
      if (
        year < graduationYear ||
        (year === graduationYear && new Date().getMonth() < 3)
      ) {
        // Still studying or before 5 April after course ends
        interestRate = 0.073;
      } else {
        const annualSalary = salaryPennies / 100;
        if (annualSalary <= 28470) {
          interestRate = 0.043;
        } else if (annualSalary <= 51245) {
          const extraRate = ((annualSalary - 28470) / (51245 - 28470)) * 0.03;
          interestRate = 0.043 + extraRate;
        } else {
          interestRate = 0.073;
        }
      }
    }

    const interestPennies = Math.round(outstandingAmountPennies * interestRate);
    outstandingAmountPennies += interestPennies;

    if (salaryPennies > thresholdPennies) {
      annualRepaymentPennies = Math.round(
        (salaryPennies - thresholdPennies) * repaymentRate
      );
    } else {
      annualRepaymentPennies = 0;
    }

    const yearlyPaymentPennies = Math.min(
      annualRepaymentPennies,
      outstandingAmountPennies
    );
    outstandingAmountPennies -= yearlyPaymentPennies;
    cumulativeAmountPaidPennies += yearlyPaymentPennies;

    results.push({
      year,
      outstandingAmount: outstandingAmountPennies,
      amountPaid: yearlyPaymentPennies,
      interestRate,
      annualInterest: interestPennies,
      cumulativeAmountPaid: cumulativeAmountPaidPennies,
      salary: salaryPennies,
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

  const monthlyRepayment =
    annualRepaymentPennies > 0
      ? Math.round(annualRepaymentPennies / 12) / 100
      : 0;

  return {
    monthlyRepayment,
    payoffInfo,
    results,
  };
}
