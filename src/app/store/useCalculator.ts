import { calculate } from "@/utils";
import { RepayKey } from "@/utils/const";
import { create } from "zustand";

type Loan = {
  years: {
    balance: any;
    interest: any;
    interestGenerated: number;
    yearlyRepay: any;
    accum: any;
  }[];
  isPaidOff: boolean;
  totalPaid: number;
  loanEndYear: any;
  loanDuration: any;
};

interface CalculationProps {
  balance: number;
  salary: number;
  duration: number;
  type: RepayKey;
  startYear: number;
}
type Calculation = ReturnType<typeof calculate>;
interface CalculatorState {
  calculation?: Calculation;
  handleCalculation: (calculationProps: CalculationProps) => void;
}

export const useCalculator = create<CalculatorState>((set) => ({
  calculation: undefined,
  handleCalculation: ({ balance, duration, salary, type, startYear }) => {
    const answer = calculate({
      balance,
      duration,
      salary,
      type,
      startYear,
    });
    set({ calculation: answer });
  },
}));
