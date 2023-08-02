"use client";
import { formatCurrency } from "@/utils";
import Chart from "./Chart";
import { Calculate } from "@/types";
import { ReactNode } from "react";
import PieChart from "./PieChart";

export default function Data(props: any) {
  return (
    <section
      className="py-10 md:py-24 bg-white overflow-hidden flex-col"
      id="results"
    >
      <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-center md:text-left">
        Results
      </h1>
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          {props.loan.loanEndYear > 0 && <Left {...props} />}
          <Right {...props} />
        </div>
      </div>
    </section>
  );
}

const Right = ({
  originalBalance,
  loan: { years, totalPaid, isPaidOff, loanEndYear, loanDuration },
}: any) => {
  return (
    <div className="w-full md:md:w-1/2">
      <div className="w-full h-[500px] flex justify-center">
        <PieChart
          data={{
            labels: ["Total Paid", "Original Balance"],
            datasets: [
              {
                data: [totalPaid, originalBalance],
                backgroundColor: ["rgb(75, 85, 99)", "#10b981"],
                hoverOffset: 4,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
const Left = ({
  monthly,
  yearly,
  weekly,
  loan: { years, totalPaid, isPaidOff, loanEndYear, loanDuration },
}: Calculate) => {
  return (
    <div className="w-full md:w-1/2 px-4 flex flex-col gap-2">
      <div className="flex gap-2 text-center">
        <Tag
          amount={
            <span>
              Your loan will be {!isPaidOff ? "written" : "paid"} off in{" "}
              <b>{loanEndYear}</b>
            </span>
          }
        />
      </div>
      <div className="flex gap-2 text-center">
        <Tag
          amount={
            <span>
              {isPaidOff
                ? "You will clear your debt in "
                : "Your written off loan balance in "}
              <br />
              <b>{loanDuration} years </b>

              {!isPaidOff && (
                <>
                  will be{" "}
                  <b>{formatCurrency(years[years.length - 1].balance)}</b>
                </>
              )}
            </span>
          }
        />
        <Tag
          amount={<b>{formatCurrency(totalPaid)}</b>}
          time="Total payments"
        />
      </div>
      <div className="flex gap-2 text-center">
        <Tag amount={<b>{formatCurrency(weekly)}</b>} time="per week" />
        <Tag amount={<b>{formatCurrency(monthly)}</b>} time="per month" />
        <Tag amount={<b>{formatCurrency(yearly)}</b>} time="per year" />
      </div>
      <Chart
        data={{
          datasets: [
            {
              data: years.map((year, i) => ({
                y: year.balance,
                x: (new Date().getFullYear() + i).toString(),
              })),
              label: "Balance",
              borderColor: "rgb(75, 85, 99)",
              fill: false,
              tension: 0.1,
            },
            {
              data: years.map(({ accum }, i) => ({
                y: accum,
                x: (new Date().getFullYear() + i).toString(),
              })),
              label: "Accumulated Payment",
              borderColor: "#10b981",
              fill: false,
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
};
function Tag({ amount, time }: { amount: ReactNode; time?: string }) {
  return (
    <p className="bg-gray-600 text-white p-2 rounded-lg flex-1 shadow-xl">
      {amount} <br /> {!!time ? time : ""}
    </p>
  );
}
