import { REPAY, RepayKey } from "./const";

interface LoanCalculationParams {
  salary: number;
  balance: number;
  type: RepayKey;
  startYear: number;
  duration: number;
}

interface LoanDetails {
  balance: number;
  originalBalance: number;
  salary: number;
  type: RepayKey;
  endYear: number;
  monthly: number;
  yearly: number;
  weekly: number;
  loan: LoanResult;
  loan100OverPay: LoanResult;
}

interface CalculateLoanParams {
  balance: number;
  loanEnds: number;
  yearlyRepay: number;
  interest: number;
  loanWrittenOffYear: number;
}

interface YearDetail {
  balance: number;
  interest: number;
  interestGenerated: number;
  yearlyRepay: number;
  accum: number;
}

interface LoanResult {
  years: YearDetail[];
  isPaidOff: boolean;
  totalPaid: number;
  loanEndYear: number;
  loanDuration: number;
}

export const calculate = ({
  salary,
  type,
  balance,
  startYear,
  duration,
}: LoanCalculationParams): LoanDetails => {
  const repaymentDetails = REPAY[2024][type];
  const originalBalance = balance;
  const endYear = startYear + duration;
  const loanWrittenOffYear = endYear + repaymentDetails.writtenOff;
  const thisYear = new Date().getFullYear();

  const monthlyRepay = calculateMonthlyRepayment(
    salary,
    repaymentDetails.monthlyThreashold,
    repaymentDetails.percentage
  );
  const yearlyRepay = monthlyRepay * 12;
  const loanEnds = loanWrittenOffYear - thisYear;

  const loan = calculateLoan({
    balance,
    loanEnds,
    yearlyRepay,
    interest: repaymentDetails.interest,
    loanWrittenOffYear,
  });

  const loan100OverPay = calculateLoan({
    balance: originalBalance,
    loanEnds,
    yearlyRepay: yearlyRepay + 100 * 12,
    interest: repaymentDetails.interest,
    loanWrittenOffYear,
  });

  return {
    balance,
    originalBalance,
    salary,
    type,
    endYear,
    monthly: monthlyRepay,
    yearly: yearlyRepay,
    weekly: monthlyRepay / 4,
    loan,
    loan100OverPay,
  };
};

const calculateMonthlyRepayment = (
  salary: number,
  threshold: number,
  percentage: number
): number => {
  const monthlySalary = salary / 12;
  return monthlySalary >= threshold
    ? (monthlySalary - threshold) * percentage
    : 0;
};

const calculateLoan = ({
  balance,
  loanEnds,
  yearlyRepay,
  interest,
  loanWrittenOffYear,
}: CalculateLoanParams): LoanResult => {
  const years: YearDetail[] = [];
  let accum = 0;
  while (balance > 0 && years.length <= loanEnds) {
    const interestGenerated = balance * interest;
    balance += interestGenerated - yearlyRepay;
    if (balance < 0) {
      yearlyRepay += balance; // Adjust the final repayment to not exceed the remaining balance
      balance = 0;
    }
    years.push({
      balance,
      interest,
      interestGenerated,
      yearlyRepay,
      accum: (accum += yearlyRepay),
    });
  }
  return {
    years,
    isPaidOff: balance < yearlyRepay,
    totalPaid: years.reduce((acc, curr) => acc + curr.yearlyRepay, 0),
    loanEndYear:
      balance < yearlyRepay
        ? years.length + new Date().getFullYear()
        : loanWrittenOffYear,
    loanDuration: balance < yearlyRepay ? years.length - 1 : loanEnds,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-gb", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
