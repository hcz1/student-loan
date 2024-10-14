"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Component as LineChart } from "./charts/line-chart";
import { ComponentPieChart } from "./charts/pie-chart";
import { ChartConfig } from "./ui/chart";

interface MortgageStats {
  monthlyPayment: number;
  totalInterest: number;
  totalAmountPaid: number;
  loanToValueRatio: number;
  repaymentSchedule: RepaymentRow[];
}

interface RepaymentRow {
  year: number;
  remainingBalance: number;
  annualPayment: number;
  annualInterest: number;
  annualPrincipal: number;
}

export function MortgageCalculator() {
  const [propertyValue, setPropertyValue] = useState("");
  const [deposit, setDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [mortgageStats, setMortgageStats] = useState<MortgageStats | null>(
    null
  );
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = Number(propertyValue) - Number(deposit);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalAmountPaid = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmountPaid - principal;
    const loanToValueRatio = (principal / Number(propertyValue)) * 100;

    const repaymentSchedule = calculateRepaymentSchedule(
      principal,
      monthlyRate,
      numberOfPayments
    );

    setMortgageStats({
      monthlyPayment,
      totalInterest,
      totalAmountPaid,
      loanToValueRatio,
      repaymentSchedule,
    });
    setIsCalculated(true);
  };

  const calculateRepaymentSchedule = (
    principal: number,
    monthlyRate: number,
    numberOfPayments: number
  ): RepaymentRow[] => {
    let remainingBalance = principal;
    const schedule: RepaymentRow[] = [];
    const yearlyPayment =
      ((principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) *
      12;

    for (let year = 1; year <= numberOfPayments / 12; year++) {
      const annualInterest = remainingBalance * (monthlyRate * 12);
      const annualPrincipal = yearlyPayment - annualInterest;
      remainingBalance -= annualPrincipal;

      schedule.push({
        year,
        remainingBalance: Math.max(0, remainingBalance),
        annualPayment: yearlyPayment,
        annualInterest,
        annualPrincipal,
      });

      if (remainingBalance <= 0) break;
    }

    return schedule;
  };

  const chartConfigLine = {
    balance: {
      label: "Remaining Balance",
      color: "hsl(var(--chart-1))",
    },
    paid: {
      label: "Cumulative Amount Paid",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const chartConfigPie = {
    amount: {
      label: "Amount",
    },
    principal: {
      label: "Principal",
      color: "hsl(var(--chart-1))",
    },
    interest: {
      label: "Interest",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div
      className={`m-4 mt-8 md:m-0 md:p-6 bg-white ${
        !isCalculated
          ? "border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,255,0.3)]"
          : "md:shadow-[8px_8px_0_0_rgba(0,0,255,0.3)]"
      } md:border-4 md:border-black ${
        isCalculated ? "flex-grow" : ""
      } flex flex-col overflow-y-scroll max-h-[calc(100vh-15rem)]`}
    >
      {!isCalculated && (
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 uppercase">
          Mortgage Calculator
        </h1>
      )}
      <motion.div
        className="flex flex-col flex-grow"
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="w-full flex flex-col lg:flex-row lg:h-full">
          <motion.div
            className={cn(isCalculated ? "w-full lg:w-1/2" : "w-full")}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <form
              onSubmit={handleCalculate}
              className={cn(
                "space-y-4",
                isCalculated ? "border-8 border-black p-4" : "border-b-0"
              )}
            >
              <InputField
                id="propertyValue"
                label="Property Value"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                frontAdornment="£"
              />
              <InputField
                id="deposit"
                label="Deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                frontAdornment="£"
              />
              <InputField
                id="interestRate"
                label="Interest Rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                step="0.1"
                rearAdornment="%"
              />
              <InputField
                id="loanTerm"
                label="Loan Term"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                rearAdornment="years"
              />
              <Button
                type="submit"
                className="w-full bg-black text-white text-xl font-bold py-3 hover:bg-gray-800"
              >
                Calculate Mortgage
              </Button>
            </form>
          </motion.div>
          <AnimatePresence>
            {isCalculated && mortgageStats && (
              <motion.div
                className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-3 flex flex-col"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="space-y-4">
                  <StatItem
                    label="Monthly Payment"
                    value={formatCurrency(mortgageStats.monthlyPayment * 100)}
                  />
                  <StatItem
                    label="Total Interest Paid"
                    value={formatCurrency(mortgageStats.totalInterest * 100)}
                  />
                  <StatItem
                    label="Total Amount Paid"
                    value={formatCurrency(mortgageStats.totalAmountPaid * 100)}
                  />
                  <StatItem
                    label="Loan-to-Value Ratio"
                    value={`${mortgageStats.loanToValueRatio.toFixed(2)}%`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {isCalculated && mortgageStats && (
            <>
              <motion.div
                className="w-full mt-6 flex-grow overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,255,0.3)] flex flex-col h-full">
                  <div className="p-4">
                    <h2 className="text-2xl font-bold">Repayment Schedule</h2>
                  </div>
                  <div className="overflow-y-auto flex-grow">
                    <Table>
                      <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow>
                          <TableHead className="font-bold text-left">
                            Year
                          </TableHead>
                          <TableHead className="font-bold text-right">
                            Remaining Balance
                          </TableHead>
                          <TableHead className="font-bold text-right">
                            Annual Payment
                          </TableHead>
                          <TableHead className="font-bold text-right">
                            Annual Interest
                          </TableHead>
                          <TableHead className="font-bold text-right">
                            Annual Principal
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mortgageStats.repaymentSchedule.map((row, index) => (
                          <TableRow
                            key={index}
                            className="border-t-2 border-black"
                          >
                            <TableCell className="font-mono">
                              {row.year}
                            </TableCell>
                            <TableCell className="font-mono text-right">
                              {formatCurrency(row.remainingBalance * 100)}
                            </TableCell>
                            <TableCell className="font-mono text-right">
                              {formatCurrency(row.annualPayment * 100)}
                            </TableCell>
                            <TableCell className="font-mono text-right">
                              {formatCurrency(row.annualInterest * 100)}
                            </TableCell>
                            <TableCell className="font-mono text-right">
                              {formatCurrency(row.annualPrincipal * 100)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <LineChart
                  data={mortgageStats.repaymentSchedule.map((row) => ({
                    year: row.year.toString(),
                    balance: row.remainingBalance,
                    paid: row.annualPayment * row.year,
                  }))}
                  title="Mortgage Repayment"
                  description="Remaining balance and cumulative amount paid"
                  chartConfig={chartConfigLine}
                  dataKey1={["year", "balance"]}
                  dataKey2={["year", "paid"]}
                  footerHeader="Total Amount Paid"
                  footerDescription={formatCurrency(
                    mortgageStats.totalAmountPaid * 100
                  )}
                />
                <ComponentPieChart
                  title="Loan Breakdown"
                  description="Principal and Interest"
                  chartData={[
                    {
                      label: "principal",
                      amount: Number(propertyValue) - Number(deposit),
                      fill: "var(--color-principal)",
                    },
                    {
                      label: "interest",
                      amount: mortgageStats.totalInterest,
                      fill: "var(--color-interest)",
                    },
                  ]}
                  center={mortgageStats.totalAmountPaid}
                  chartConfig={chartConfigPie}
                  dataKey="amount"
                  nameKey="label"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: string;
  frontAdornment?: React.ReactNode;
  rearAdornment?: React.ReactNode;
}

function InputField({
  id,
  label,
  value,
  onChange,
  step,
  frontAdornment,
  rearAdornment,
}: InputFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="text-lg font-bold">
        {label}
      </Label>
      <div className="relative">
        {frontAdornment && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-bold">
            {frontAdornment}
          </span>
        )}
        {rearAdornment && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-bold">
            {rearAdornment}
          </span>
        )}
        <Input
          id={id}
          type="number"
          value={value}
          onChange={onChange}
          className={cn(
            "mt-1 w-full border-2 border-black text-lg p-2",
            frontAdornment ? "pl-8" : "",
            rearAdornment ? "pr-16" : ""
          )}
          step={step}
          required
        />
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div>
      <h2 className="text-lg font-bold">{label}:</h2>
      <p className="text-2xl font-mono text-[rgba(0,0,255,1)]">{value}</p>
    </div>
  );
}
