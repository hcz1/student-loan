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
  const loanWrittenOffYear = endYear + 30;
  const thisYear = new Date().getFullYear();

  const { monthlyThreashold, percentage, interest } = REPAY[type];
  const monthlySalary = salary / 12;
  const monthlyRepay =
    monthlySalary >= monthlyThreashold
      ? (monthlySalary - monthlyThreashold) * percentage
      : 0;
  const yearlyRepay = monthlyRepay * 12;
  const loanEnds = loanWrittenOffYear - thisYear;
  const years = calculateLoan({ balance, loanEnds, yearlyRepay, interest });

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
          : loanWrittenOffYear,
      loanDuration: balance < yearlyRepay ? years.length : loanEnds,
    },
  };
};

const calculateLoan = ({ balance, loanEnds, yearlyRepay, interest }: any) => {
  const years = [];
  let accum = 0;
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
  return years;
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
