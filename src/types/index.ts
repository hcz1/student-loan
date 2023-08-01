import { RepayKey } from "@/utils/const";

export type Calculate = {
  salary: number;
  balance: number;
  monthly: number;
  yearly: number;
  weekly: number;
  type: RepayKey;
  loan: {
    years: Year[];
    isPaidOff: boolean;
  };
};

type Year = {
  balance: number;
  interest: number;
  interestGenerated: number;
  yearlyRepay: number;
};
