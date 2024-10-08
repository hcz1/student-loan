"use client";

import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorForm } from "./calculator-form";
import { ResultsDisplay } from "./results-display";
import { calculateRepayment } from "@/lib/loan-calculations";
import type { LoanDetails, CalculationResult } from "@/types/loan";
import { ResultsTable } from "./results-table";
import { cn } from "@/lib/utils";
import { Disclaimer } from "./disclaimer";
import { ResultsChart } from "./results-chart";

export function UkStudentLoanCalculator() {
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (loanDetails: LoanDetails) => {
    const result = calculateRepayment(loanDetails);
    setCalculationResult(result);
    setIsCalculated(true);
  };

  return (
    <div
      className={`p-6 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,255,0.3)] ${
        isCalculated ? "flex-grow" : ""
      } flex flex-col overflow-y-scroll max-h-[calc(100vh-10rem)]`}
    >
      {!isCalculated && (
        <h1 className="text-4xl font-bold mb-6 uppercase">
          UK Student Loan Calculator
        </h1>
      )}
      <motion.div
        className="flex flex-col flex-grow"
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="w-full flex flex-col lg:flex-row lg:h-full">
          <motion.div
            className={cn(
              "lg:pr-3",
              isCalculated ? "w-full lg:w-1/2" : "w-full"
            )}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <CalculatorForm
                className={cn(
                  isCalculated ? "border-8 border-black p-4" : "border-b-0"
                )}
                onCalculate={handleCalculate}
              />
            </Suspense>
          </motion.div>
          <AnimatePresence>
            {isCalculated && calculationResult && (
              <motion.div
                className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-3 flex flex-col"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ResultsDisplay result={calculationResult} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {isCalculated && calculationResult && (
            <>
              <motion.div
                className="w-full mt-6 flex-grow overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ResultsTable result={calculationResult} />
              </motion.div>
              <motion.div
                className="w-full mt-6 flex-grow overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ResultsChart result={calculationResult} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Disclaimer className="my-4" />
      </motion.div>
    </div>
  );
}
