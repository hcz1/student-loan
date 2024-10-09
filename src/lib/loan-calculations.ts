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
    salaryIncreasePercentage,
    overpayment,
  } = loanDetails;

  const balancePennies = Math.round(loanBalance * 100);
  let salaryPennies = Math.round(grossSalary * 100);
  const salaryIncrease = salaryIncreasePercentage / 100;
  let annualRepaymentPennies = 0;
  let thresholdPennies = 0;
  let writeOffYears = 30;
  let repaymentRate = 0.09; // Default repayment rate
  let interestRate = 0.043; // Default interest rate
  let interestRateInfo = ""; // Interest rate information text

  // Set loan parameters based on loanType
  if (loanType === "1") {
    thresholdPennies = 2499000; // £24,990
    writeOffYears = 25;
    interestRate = 0.043;
    repaymentRate = 0.09;
    interestRateInfo = "Your interest rate is fixed at 4.3% for Plan 1 loans.";
  } else if (loanType === "2") {
    thresholdPennies = 2729500; // £27,295
    writeOffYears = 30;
    repaymentRate = 0.09;
    // Interest rate will be calculated based on income
    interestRateInfo =
      "Your interest rate varies based on your income for Plan 2 loans.";
  } else if (loanType === "4") {
    thresholdPennies = 3139500; // £31,395
    writeOffYears = 30;
    interestRate = 0.043;
    repaymentRate = 0.09;
    interestRateInfo = "Your interest rate is fixed at 4.3% for Plan 4 loans.";
  } else if (loanType === "5") {
    thresholdPennies = 2500000; // £25,000
    writeOffYears = 40;
    interestRate = 0.043;
    repaymentRate = 0.09;
    interestRateInfo = "Your interest rate is fixed at 4.3% for Plan 5 loans.";
  } else if (loanType === "postgraduate") {
    thresholdPennies = 2100000; // £21,000
    writeOffYears = 30;
    interestRate = 0.073;
    repaymentRate = 0.06;
    interestRateInfo =
      "Your interest rate is fixed at 7.3% for Postgraduate loans.";
  }

  const overpaymentMonthlyPennies = (overpayment ?? 100) * 100; // £100 monthly overpayment in pennies
  const overpaymentAnnualPennies = overpaymentMonthlyPennies * 12;

  const results: ResultRow[] = [];
  let outstandingAmountPennies = balancePennies;
  let cumulativeAmountPaidPennies = 0;
  let outstandingAmountWithOverpaymentPennies = balancePennies;
  let cumulativeAmountPaidWithOverpaymentPennies = 0;

  const graduationYear = courseStartYear + courseDuration;
  const currentYear = new Date().getFullYear();
  const writeOffYear = graduationYear + writeOffYears;
  let payoffYear = writeOffYear;
  let payoffYearWithOverpayment = writeOffYear;

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
        interestRateInfo =
          "While studying, your interest rate is 7.3% for Plan 2 loans.";
      } else {
        const annualSalary = salaryPennies / 100;
        if (annualSalary <= 28470) {
          interestRate = 0.043;
          interestRateInfo =
            "Your interest rate is 4.3% for income £28,470 or less under Plan 2 loans.";
        } else if (annualSalary <= 51245) {
          const extraRate = ((annualSalary - 28470) / (51245 - 28470)) * 0.03;
          interestRate = 0.043 + extraRate;
          const totalInterestRate = (interestRate * 100).toFixed(2);
          interestRateInfo = `Your interest rate is ${totalInterestRate}% based on your income under Plan 2 loans.`;
        } else {
          interestRate = 0.073;
          interestRateInfo =
            "Your interest rate is 7.3% for income above £51,245 under Plan 2 loans.";
        }
      }
    }

    // Standard repayment scenario
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

    if (outstandingAmountPennies <= 0 && payoffYear === writeOffYear) {
      payoffYear = year;
    }

    // Repayment with overpayment scenario
    const interestPenniesWithOverpayment = Math.round(
      outstandingAmountWithOverpaymentPennies * interestRate
    );
    outstandingAmountWithOverpaymentPennies += interestPenniesWithOverpayment;

    const yearlyPaymentWithOverpaymentPennies = Math.min(
      annualRepaymentPennies + overpaymentAnnualPennies,
      outstandingAmountWithOverpaymentPennies
    );
    outstandingAmountWithOverpaymentPennies -=
      yearlyPaymentWithOverpaymentPennies;
    cumulativeAmountPaidWithOverpaymentPennies +=
      yearlyPaymentWithOverpaymentPennies;

    if (
      outstandingAmountWithOverpaymentPennies <= 0 &&
      payoffYearWithOverpayment === writeOffYear
    ) {
      payoffYearWithOverpayment = year;
    }

    results.push({
      year,
      outstandingAmount: Math.max(outstandingAmountPennies, 0),
      amountPaid: yearlyPaymentPennies,
      interestRate,
      annualInterest: interestPennies,
      cumulativeAmountPaid: cumulativeAmountPaidPennies,
      salary: salaryPennies,
      outstandingAmountWithOverpayment: Math.max(
        outstandingAmountWithOverpaymentPennies,
        0
      ),
      amountPaidWithOverpayment: yearlyPaymentWithOverpaymentPennies,
      cumulativeAmountPaidWithOverpayment:
        cumulativeAmountPaidWithOverpaymentPennies,
    });

    if (
      outstandingAmountPennies <= 0 &&
      outstandingAmountWithOverpaymentPennies <= 0
    ) {
      break; // Both loans are paid off
    }
  }

  // Compute payoff information
  let payoffInfo = "";

  if (payoffYear < writeOffYear) {
    payoffInfo += `Your loan will be paid off in ${payoffYear} without overpayment.`;
  } else {
    payoffInfo += `Your loan will be written off in ${writeOffYear} without overpayment.`;
  }

  if (payoffYearWithOverpayment < writeOffYear) {
    payoffInfo += `\nWith £${
      overpaymentMonthlyPennies / 100
    } monthly overpayment, your loan will be paid off in ${payoffYearWithOverpayment}.`;
  } else {
    payoffInfo += `\nEven with £${
      overpaymentMonthlyPennies / 100
    } monthly overpayment, your loan will be written off in ${writeOffYear}.`;
  }

  // After the loan repayment calculations, compute the total amounts paid
  const totalPaidPennies = cumulativeAmountPaidPennies;
  const totalPaidWithOverpaymentPennies =
    cumulativeAmountPaidWithOverpaymentPennies;

  // Calculate the savings and percentage saving (can be negative)
  const savingsPennies = totalPaidPennies - totalPaidWithOverpaymentPennies;
  const percentageSaving = (savingsPennies / totalPaidPennies) * 100;

  // Monthly repayments
  const yearlyRepaymentThisYear = results[0].amountPaid;
  const monthlyRepaymentThisYear = Math.round(
    yearlyRepaymentThisYear / 12 / 100
  );

  const yearlyRepaymentWithOverpaymentThisYear =
    results[0].amountPaidWithOverpayment;
  const monthlyRepaymentWithOverpaymentThisYear = Math.round(
    yearlyRepaymentWithOverpaymentThisYear / 12 / 100
  );

  // Include information about savings or losses
  if (percentageSaving > 0) {
    payoffInfo += `\nBy making overpayments, you save ${percentageSaving.toFixed(
      2
    )}% on the total amount repaid.`;
  } else if (percentageSaving < 0) {
    const lossAmount = -savingsPennies / 100; // Convert from pennies to pounds
    payoffInfo += `\nOverpaying would not be beneficial as you would end up paying £${lossAmount.toFixed(
      2
    )} more in total.`;
  }

  return {
    monthlyRepayment: monthlyRepaymentThisYear,
    monthlyRepaymentWithOverpayment: monthlyRepaymentWithOverpaymentThisYear,
    payoffInfo,
    interestRateInfo,
    results,
    percentageSaving, // Include the percentage saving (can be negative)
  };
}
