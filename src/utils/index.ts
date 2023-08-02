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
  const originalBalance = balance;
  const endYear = startYear + duration;
  const loanEndYear = endYear + 30;
  const thisYear = new Date().getFullYear();

  const { monthlyThreashold, percentage, interest } = REPAY[type];
  const monthlySalary = salary / 12;
  const monthlyRepay =
    monthlySalary >= monthlyThreashold
      ? (monthlySalary - monthlyThreashold) * percentage
      : 0;
  const yearlyRepay = monthlyRepay * 12;
  const years = [];
  let accum = 0;
  const loanEnds = loanEndYear - thisYear;
  while (balance > 0 && years.length <= loanEnds && balance >= yearlyRepay) {
    const interestGenerated = balance * interest;

    balance = balance + interestGenerated - yearlyRepay;
    years.push({
      balance,
      interest,
      interestGenerated,
      yearlyRepay,
      accum: (accum += yearlyRepay),
    });
  }

  return {
    balance,
    originalBalance,
    salary,
    type,
    monthly: monthlyRepay,
    yearly: yearlyRepay,
    weekly: monthlyRepay / 4,
    loan: {
      years,
      isPaidOff: balance < yearlyRepay,
      totalPaid: years.reduce((acc, curr) => acc + curr.yearlyRepay, 0),
      loanEndYear:
        balance < yearlyRepay
          ? years.length + new Date().getFullYear()
          : loanEndYear,
      loanDuration: balance < yearlyRepay ? years.length : loanEnds,
    },
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
