export interface LoanDetails {
  loanBalance: number;
  loanType: string;
  grossSalary: number;
  courseStartYear: number;
  courseDuration: number;
  //   interestRate?: number;
  salaryIncreasePercentage: number;
  overpayment: number | null;
}

export interface ResultRow {
  year: number;
  outstandingAmount: number;
  amountPaid: number;
  interestRate: number;
  annualInterest: number;
  cumulativeAmountPaid: number;
  salary: number;
  amountPaidWithOverpayment: number;
  outstandingAmountWithOverpayment: number;
  cumulativeAmountPaidWithOverpayment: number;
}

export interface CalculationResult {
  monthlyRepayment: number;
  payoffInfo: string;
  results: ResultRow[];
  interestRateInfo: string;
  monthlyRepaymentWithOverpayment: number;
  percentageSaving: number;
}
