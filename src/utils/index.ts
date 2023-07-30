import { REPAY, RepayKey } from "./const";

export const calculate = ({
  salary,
  type,
}: {
  salary: number;
  type: RepayKey;
}) => {
  const { monthlyThreashold, percentage } = REPAY[type];
  const monthlySalary = salary / 12;
  const monthlyRepay = (monthlySalary - monthlyThreashold) * percentage;
  return {
    monthly: monthlyRepay,
    yearly: monthlyRepay * 12,
    weekly: monthlyRepay / 4,
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
