import { REPAY, RepayKey } from "./const";

export const calculate = ({
  salary,
  type,
  balance,
  startYear,
  duration,
}: {
  salary: number;
  balance: number;
  type: RepayKey;
  startYear: number;
  duration: number;
}) => {
  const { monthlyThreashold, percentage, interest, writtenOff } =
    REPAY[2023][type];
  const originalBalance = balance;
  const endYear = startYear + duration;
  const loanWrittenOffYear = endYear + writtenOff;
  const thisYear = new Date().getFullYear();

  const monthlySalary = salary / 12;
  const monthlyRepay =
    monthlySalary >= monthlyThreashold
      ? (monthlySalary - monthlyThreashold) * percentage
      : 0;
  const yearlyRepay = monthlyRepay * 12;
  const loanEnds = loanWrittenOffYear - thisYear;
  const loan = calculateLoan({
    balance,
    loanEnds,
    yearlyRepay,
    interest,
    loanWrittenOffYear,
  });
  const loan100OverPay = calculateLoan({
    balance: originalBalance,
    loanEnds,
    yearlyRepay: yearlyRepay + 100 * 12,
    interest,
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

const calculateLoan = ({
  balance,
  loanEnds,
  yearlyRepay,
  interest,
  loanWrittenOffYear,
}: any) => {
  const years = [];
  let accum = 0;
  while (balance > 0 && years.length <= loanEnds) {
    const interestGenerated = balance * interest;
    const newBalance = balance + interestGenerated;
    balance = newBalance - yearlyRepay;
    if (balance < 0) {
      yearlyRepay = newBalance;
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

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-gb", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
