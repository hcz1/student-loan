"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorForm } from "./calculator-form";
import { ResultsDisplay } from "./results-display";
import { calculateRepayment } from "@/lib/loan-calculations";
import type { LoanDetails, CalculationResult } from "@/types/loan";
import { ResultsTable } from "./results-table";

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
        isCalculated ? "h-[calc(100vh-2rem)]" : ""
      } flex flex-col overflow-y-scroll`}
    >
      <h1 className="text-4xl font-bold mb-6 uppercase">
        UK Student Loan Calculator
      </h1>
      <motion.div
        className="flex flex-col flex-grow lg:overflow-hidden"
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col lg:flex-row lg:h-full">
          <motion.div
            className="w-full lg:w-1/2 lg:pr-3"
            // animate={isCalculated ? { width: "50%" } : { width: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <CalculatorForm onCalculate={handleCalculate} />
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
            <motion.div
              className="w-full mt-6 flex-grow overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ResultsTable result={calculationResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
