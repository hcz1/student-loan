import { RepayKey } from "@/utils/const";

export type Calculate = {
  salary: number;
  balance: number;
  originalBalance: number;
  monthly: number;
  yearly: number;
  weekly: number;
  hasCalculated: boolean;
  type: RepayKey;
  loan: Loan;
  loan100OverPay: Loan;
};

type Loan = {
  years: Year[];
  isPaidOff: boolean;
  totalPaid: number;
  loanEndYear: number;
  loanDuration: number;
};
type Year = {
  balance: number;
  interest: number;
  interestGenerated: number;
  yearlyRepay: number;
  accum: number;
};
