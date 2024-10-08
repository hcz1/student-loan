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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import Link from "next/link";

interface ResultsTableProps {
  result: CalculationResult;
}

export function ResultsTable({ result }: ResultsTableProps) {
  const { results, interestRateInfo } = result;
  return (
    <div className="border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,255,0.3)] flex flex-col h-full">
      <h2 className="text-2xl font-bold p-4">Repayment Schedule</h2>
      <div className="overflow-y-auto flex-grow">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="font-bold text-left">Year</TableHead>
              <TableHead className="font-bold text-right flex items-center gap-1 justify-end">
                Salary
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} />
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="border-2 border-black bg-white p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                    >
                      <p className="text-left mb-2">
                        We assume a 2% increase in salary each year. <br /> Use
                        the advanced mode slider to adjust the salary increase.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead className="font-bold text-right">
                Outstanding Amount
              </TableHead>
              <TableHead className="font-bold text-right">
                Annual Interest
              </TableHead>
              <TableHead className="font-bold text-right">
                Amount Paid
              </TableHead>
              <TableHead className="font-bold text-right flex items-center gap-1 justify-end">
                Interest Rate
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} />
                    </TooltipTrigger>
                    <TooltipContent className="border-2 border-black bg-white p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <p className="mb-2">{interestRateInfo}</p>
                      <Link
                        href="https://www.gov.uk/repaying-your-student-loan/what-you-pay"
                        target="_blank"
                        className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 border-2 border-black inline-block"
                      >
                        More information
                      </Link>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead className="font-bold text-right">
                Cumulative Amount Paid
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
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.annualInterest)}
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.amountPaid)}
                </TableCell>
                <TableCell className="font-mono text-right">
                  {(row.interestRate * 100).toFixed(2)}%
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.cumulativeAmountPaid)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
