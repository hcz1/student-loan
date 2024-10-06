export interface LoanDetails {
  loanBalance: number;
  loanType: string;
  grossSalary: number;
  courseStartYear: number;
  courseDuration: number;
}

export interface ResultRow {
  year: number;
  outstandingAmount: number;
  amountPaid: number;
  interestRate: number;
  annualInterest: number;
  cumulativeAmountPaid: number;
}

export interface CalculationResult {
  monthlyRepayment: number;
  payoffInfo: string;
  results: ResultRow[];
}
