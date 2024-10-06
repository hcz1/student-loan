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

interface ResultsTableProps {
  result: CalculationResult;
}

export function ResultsTable({ result }: ResultsTableProps) {
  const { results } = result;
  return (
    <div className="border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,255,0.3)] flex flex-col h-full">
      <h2 className="text-2xl font-bold p-4">Repayment Schedule</h2>
      <div className="overflow-y-auto flex-grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-left sticky top-0 bg-white">
                Year
              </TableHead>
              <TableHead className="font-bold text-right sticky top-0 bg-white">
                Outstanding Amount
              </TableHead>
              <TableHead className="font-bold text-right sticky top-0 bg-white">
                Amount Paid
              </TableHead>
              <TableHead className="font-bold text-right sticky top-0 bg-white">
                Interest Rate
              </TableHead>
              <TableHead className="font-bold text-right sticky top-0 bg-white">
                Cumulative Amount Paid
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={index} className="border-t-2 border-black">
                <TableCell className="font-mono">{row.year}</TableCell>
                <TableCell className="font-mono text-right">
                  {formatCurrency(row.outstandingAmount)}
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
