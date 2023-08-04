import { Calculate } from "@/types";
import { formatCurrency } from "@/utils";
import { REPAY, RepayKey } from "@/utils/const";

interface DataTableProps extends Calculate {}
const DataTable = ({
  balance,
  loan,
  salary,
  endYear,
  type,
}: DataTableProps) => {
  const { isPaidOff, loanDuration, loanEndYear, totalPaid, years } = loan;
  const { interest } = REPAY[2023][type as RepayKey];
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Your Loan
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Given a balance of <b>{formatCurrency(balance)}</b> an annual salary
            of <b>{formatCurrency(salary)}</b> and finishing your course in{" "}
            <b>{endYear}</b>.
            <br />
            <i>
              Please note this is an estimate and we assume the current year
              interest rate <b>({interest * 100}%)</b> for the entirity of the
              loan.
            </i>
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <TableHeadRow label="Year" />
            <TableHeadRow label="Total Debt" />
            <TableHeadRow label="Interest Accrued" />
            <TableHeadRow label="Yearly Payment" />
            {/* <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {years.map(
            (
              { accum, balance, interest, interestGenerated, yearlyRepay },
              index
            ) => {
              const year = new Date().getFullYear() + index;
              return (
                <Row
                  key={index}
                  className="border-b dark:border-gray"
                  year={year}
                  interestAccrued={formatCurrency(interestGenerated)}
                  totalDebt={formatCurrency(balance)}
                  yearlyPayment={formatCurrency(yearlyRepay)}
                />
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
function TableHeadRow({ label }: { label: string }) {
  return (
    <th scope="col" className="px-6 py-3">
      {label}
    </th>
  );
}
function Row({
  className,
  year,
  totalDebt,
  interestAccrued,
  yearlyPayment,
}: {
  className?: string;
  year?: number;
  totalDebt?: string;
  interestAccrued?: string;
  yearlyPayment?: string;
}) {
  return (
    <tr className={`bg-white dark:bg-gray-800 ${className}`}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {year}
      </th>
      <td className="px-6 py-4">{totalDebt}</td>
      <td className="px-6 py-4">{interestAccrued}</td>
      <td className="px-6 py-4">{yearlyPayment}</td>
      {/* <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td> */}
    </tr>
  );
}
