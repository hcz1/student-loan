"use client";
import { twMerge } from "tailwind-merge";
import { formatCurrency } from "@/utils";
import Chart from "../Chart";
import { Calculate } from "@/types";
import { ReactNode } from "react";

import DataTable from "../Table";
import { BrowserView } from "react-device-detect";
import Assumptions from "./Assumptions";
import { useCalculator } from "@/app/store/useCalculator";

export default function Data() {
  return (
    <section
      className="py-10 md:py-24 bg-white overflow-hidden flex-col"
      id="results"
    >
      <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-center md:text-left">
        Results
      </h1>

      <div className="container px-4 mx-auto">
        <Tag className="mb-6" amount={<Assumptions />} />
        <div className="flex flex-wrap -mx-4">
          <Left />
          <Right />
        </div>
      </div>
    </section>
  );
}

const Right = () => {
  const { calculation } = useCalculator((state) => state);
  return (
    <div className="w-full md:md:w-1/2 px-4">
      <div className="w-full flex flex-col justify-center p-4 mb-16 md:mb-0 shadow-xl rounded-lg mb-4 bg-gray-600 mt-2 md:mt-0">
        {calculation?.loan && <DataTable />}
        {/* <PieChart
          data={{
            labels: ["Total Paid", "Original Balance"],
            datasets: [
              {
                data: [totalPaid, originalBalance],
                backgroundColor: ["#fff", "#10b981"],
                hoverOffset: 4,
              },
            ],
          }}
        /> */}
      </div>
    </div>
  );
};
const Left = () => {
  const { calculation } = useCalculator((state) => state);
  const difference = calculation
    ? calculation.loan.totalPaid - calculation.originalBalance
    : 0;
  const percentage = calculation
    ? (Math.abs(difference / calculation.originalBalance) * 100).toFixed(2)
    : 0;
  const paidMore = calculation
    ? calculation.originalBalance < calculation.loan.totalPaid
    : false;

  const does100SaveMoney = calculation
    ? calculation.loan100OverPay.totalPaid < calculation.loan.totalPaid
    : false;
  return (
    <div className="w-full md:w-1/2 px-4 flex flex-col gap-2 text-center">
      <div>
        <Tag
          rounded="rounded-tl-lg rounded-tr-lg"
          amount={"This year you will pay"}
        />
        <div className="flex">
          {calculation?.weekly && (
            <Tag
              rounded="rounded-bl-lg"
              amount={<b>{formatCurrency(calculation?.weekly)}</b>}
              time="per week"
            />
          )}
          {calculation?.monthly && (
            <Tag
              rounded=""
              amount={<b>{formatCurrency(calculation?.monthly)}</b>}
              time="per month"
            />
          )}
          {calculation?.yearly && (
            <Tag
              rounded="rounded-br-lg"
              amount={<b>{formatCurrency(calculation?.yearly)}</b>}
              time="per year"
            />
          )}
        </div>
      </div>
      <div>
        <Tag
          amount={
            <span>
              Your loan will be{" "}
              {!calculation?.loan.isPaidOff ? "written" : "paid"} off in{" "}
              <b>{calculation?.loan.loanEndYear - 1}</b>
            </span>
          }
        />
      </div>
      <div className="flex gap-2">
        <Tag
          amount={
            <span>
              {calculation?.loan.isPaidOff
                ? "You will clear your debt in "
                : "Your written off loan balance in "}
              <br />
              <b>{calculation?.loan.loanDuration} years </b>

              {!calculation?.loan.isPaidOff && (
                <>
                  will be{" "}
                  <b>
                    {formatCurrency(
                      calculation?.loan.years[
                        calculation?.loan.years.length - 1
                      ].balance
                    )}
                  </b>
                </>
              )}
            </span>
          }
        />
        {calculation && (
          <Tag
            time={<b>{formatCurrency(calculation?.loan.totalPaid)}</b>}
            amount="Total payments"
          />
        )}
      </div>
      <div>
        <Tag
          amount={
            <>
              {(calculation?.loan.totalPaid || paidMore) && calculation && (
                <>
                  You paid <b>{formatCurrency(difference)}</b> more than the
                  current balance of{" "}
                  <b>{formatCurrency(calculation?.originalBalance)}</b>
                </>
              )}
              {!calculation?.originalBalance && !paidMore && calculation && (
                <>
                  You have paid back only{" "}
                  <b>{formatCurrency(calculation?.loan.totalPaid)}</b> out of
                  the <b>{formatCurrency(calculation?.originalBalance)}</b>{" "}
                  borrowed, resulting in a deficit of{" "}
                  <b>{formatCurrency(Math.abs(difference))}</b> compared to the
                  initial loan amount
                </>
              )}
            </>
          }
        />
      </div>
      <div>
        <Tag
          amount={
            does100SaveMoney && calculation ? (
              <>
                If you paid <b>£100</b> extra a month you&apos;d pay{" "}
                <b>{formatCurrency(calculation.loan100OverPay.totalPaid)}</b>{" "}
                saving you{" "}
                <b>
                  {formatCurrency(
                    calculation.loan.totalPaid -
                      calculation.loan100OverPay.totalPaid
                  )}
                </b>{" "}
                and finish paying{" "}
                <b>
                  {calculation.loan.years.length -
                    calculation.loan100OverPay.years.length}{" "}
                  years
                </b>{" "}
                quicker
              </>
            ) : calculation ? (
              <>
                If you paid <b>£100</b> extra a month you&apos;d pay{" "}
                <b>{formatCurrency(calculation.loan100OverPay.totalPaid)}</b>{" "}
                more costing you{" "}
                <b>
                  {formatCurrency(
                    calculation.loan100OverPay.totalPaid -
                      calculation.loan.totalPaid
                  )}
                </b>
              </>
            ) : (
              <></>
            )
          }
        />
      </div>
      {/* <BrowserView>
        <div className="w-full p-4 shadow-xl rounded-lg bg-gray-600 sm:mb-2">
          <Chart
            data={{
              datasets: [
                {
                  data: years.map((year, i) => ({
                    y: year.balance,
                    x: (new Date().getFullYear() + i).toString(),
                  })),
                  label: "Balance",
                  backgroundColor: "#10b981",
                  borderColor: "#10b981",
                  tension: 0.1,
                },
                {
                  data: years100.map((year, i) => ({
                    y: year.balance,
                    x: (new Date().getFullYear() + i).toString(),
                  })),
                  label: "Balance (£100 extra)",
                  backgroundColor: "#fff",
                  borderColor: "#10b981",
                  tension: 0.1,
                },
                {
                  data: years.map(({ accum }, i) => ({
                    y: accum,
                    x: (new Date().getFullYear() + i).toString(),
                  })),
                  label: "Accumulated Payment",
                  backgroundColor: "#0284c7",
                  borderColor: "#0284c7",
                  tension: 0.1,
                },
                {
                  data: years100.map(({ accum }, i) => ({
                    y: accum,
                    x: (new Date().getFullYear() + i).toString(),
                  })),
                  label: "Accumulated Payment (£100 extra)",
                  backgroundColor: "#fff",
                  borderColor: "#0284c7",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      </BrowserView> */}
    </div>
  );
};
function Tag({
  className,
  amount,
  time,
  rounded,
}: {
  className?: string;
  amount: ReactNode;
  rounded?: string;
  time?: ReactNode;
}) {
  return (
    <p
      className={twMerge(
        `bg-gray-600 text-white p-2 flex-1 shadow-xl ${
          rounded ?? "rounded-lg"
        } ${className}`
      )}
    >
      {amount}{" "}
      {!!time ? (
        <>
          <br />
          {time}
        </>
      ) : (
        ""
      )}
    </p>
  );
}
