import { REPAY, RepayKey } from "./const";

export const calculate = ({
  salary,
  type,
  balance,
}: {
  salary: number;
  balance: number;
  type: RepayKey;
}) => {
  const { monthlyThreashold, percentage, interest } = REPAY[type];
  const monthlySalary = salary / 12;
  const monthlyRepay = (monthlySalary - monthlyThreashold) * percentage;
  const yearlyRepay = monthlyRepay * 12;
  const years = [];
  while (balance > 0 && years.length < 30 && balance >= yearlyRepay) {
    const interestGenerated = balance * interest;

    balance = balance + interestGenerated - yearlyRepay;
    years.push({
      balance,
      interest,
      interestGenerated,
      yearlyRepay,
    });
  }
  return {
    balance,
    salary,
    type,
    monthly: monthlyRepay,
    yearly: yearlyRepay,
    weekly: monthlyRepay / 4,
    loan: {
      years,
      isPaidOff: balance > yearlyRepay,
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
