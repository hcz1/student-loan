import { formatCurrency } from "@/lib/format-currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalculationResult } from "@/types/loan";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import Link from "next/link";

interface ResultsTableProps {
  result: CalculationResult;
}

export function ResultsTable({ result }: ResultsTableProps) {
  const { results, interestRateInfo } = result;
  const [showOverpayment, setShowOverpayment] = useState(false);

  return (
    <div className="border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,255,0.3)] flex flex-col h-full">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Repayment Schedule</h2>
        <div className="flex items-center gap-2">
          <span>Show Overpayment</span>
          <Switch
            checked={showOverpayment}
            onCheckedChange={setShowOverpayment}
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-grow">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="font-bold text-left">Year</TableHead>
              <TableHead className="font-bold text-right flex items-center gap-1 justify-end">
                Salary
                <Popover>
                  <PopoverTrigger>
                    <Info size={16} />
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    className="border-2 border-black bg-white p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  >
                    <p className="text-left mb-2">
                      We assume a 2% increase in salary each year. <br /> Use
                      the advanced mode slider to adjust the salary increase.
                    </p>
                  </PopoverContent>
                </Popover>
              </TableHead>

              <TableHead className="font-bold text-right">
                Outstanding Amount
                <AnimatePresence>
                  {showOverpayment && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block text-xs text-blue-600"
                    >
                      (Regular / With Overpayment)
                    </motion.span>
                  )}
                </AnimatePresence>
              </TableHead>
              <TableHead className="font-bold text-right">
                Annual Interest
              </TableHead>
              <TableHead className="font-bold text-right">
                Amount Paid
                <AnimatePresence>
                  {showOverpayment && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block text-xs text-blue-600"
                    >
                      (Regular / With Overpayment)
                    </motion.span>
                  )}
                </AnimatePresence>
              </TableHead>

              <TableHead className="font-bold text-right flex items-center gap-1 justify-end">
                Interest Rate
                <Popover>
                  <PopoverTrigger>
                    <Info size={16} />
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    className="border-2 border-black bg-white p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  >
                    <p className="mb-2">{interestRateInfo}</p>
                    <Link
                      href="https://www.gov.uk/repaying-your-student-loan/what-you-pay"
                      target="_blank"
                      className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 border-2 border-black inline-block"
                    >
                      More information
                    </Link>
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead className="font-bold text-right">
                Cumulative Amount Paid
                <AnimatePresence>
                  {showOverpayment && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block text-xs text-blue-600"
                    >
                      (Regular / With Overpayment)
                    </motion.span>
                  )}
                </AnimatePresence>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={index} className="border-t-2 border-black">
                <TableCell className="font-mono">{row.year}</TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.salary)}
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.outstandingAmount)}
                  <AnimatePresence>
                    {showOverpayment && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="block text-sm text-blue-600"
                      >
                        {formatCurrency(row.outstandingAmountWithOverpayment)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.annualInterest)}
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.amountPaid)}
                  <AnimatePresence>
                    {showOverpayment && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="block text-sm text-blue-600"
                      >
                        {formatCurrency(row.amountPaidWithOverpayment)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </TableCell>
                <TableCell className="font-mono text-right">
                  {(row.interestRate * 100).toFixed(2)}%
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.cumulativeAmountPaid)}
                  <AnimatePresence>
                    {showOverpayment && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="block text-sm text-blue-600"
                      >
                        {formatCurrency(
                          row.cumulativeAmountPaidWithOverpayment
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AnimatePresence>
        {showOverpayment && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-gray-100 border-t-2 border-black"
          >
            <p className="text-sm">
              <span className="font-bold">Regular payments</span> are shown in
              black.
              <br />
              <span className="font-bold text-blue-600">Overpayments</span> are
              shown in blue below the regular payments.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
