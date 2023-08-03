"use client";
import { twMerge } from "tailwind-merge";
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
    <div className="w-full md:md:w-1/2 px-4">
      <div className="w-full h-full flex flex-col justify-center p-4 mb-16 md:mb-0 shadow-xl rounded-lg mb-4 bg-gray-600">
        <PieChart
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
        />
      </div>
    </div>
  );
};
const Left = ({
  originalBalance,
  monthly,
  yearly,
  weekly,
  loan: { years, totalPaid, isPaidOff, loanEndYear, loanDuration },
}: Calculate) => {
  const difference = totalPaid - originalBalance;
  const percentage = (Math.abs(difference / originalBalance) * 100).toFixed(2);
  return (
    <div className="w-full md:w-1/2 px-4 flex flex-col gap-2 text-center">
      <div>
        <Tag
          rounded="rounded-tl-lg rounded-tr-lg"
          amount={"This year you will pay"}
        />
        <div className="flex">
          <Tag
            rounded="rounded-bl-lg"
            amount={<b>{formatCurrency(weekly)}</b>}
            time="per week"
          />
          <Tag
            rounded=""
            amount={<b>{formatCurrency(monthly)}</b>}
            time="per month"
          />
          <Tag
            rounded="rounded-br-lg"
            amount={<b>{formatCurrency(yearly)}</b>}
            time="per year"
          />
        </div>
      </div>
      <div>
        <Tag
          amount={
            <span>
              Your loan will be {!isPaidOff ? "written" : "paid"} off in{" "}
              <b>{loanEndYear}</b>
            </span>
          }
        />
      </div>
      <div className="flex gap-2">
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
          time={<b>{formatCurrency(totalPaid)}</b>}
          amount="Total payments"
        />
      </div>
      <div>
        <Tag
          amount={
            <>
              {isPaidOff && (
                <>
                  From the original <b>{formatCurrency(originalBalance)}</b> you
                  paid an extra
                  <br /> <b>{formatCurrency(difference)}</b>
                  <b>({percentage}%) </b>
                  in interest
                </>
              )}
              {!isPaidOff && (
                <>
                  From the original <b>{formatCurrency(originalBalance)}</b> you
                  paid <b>{formatCurrency(Math.abs(totalPaid))}</b>
                  <br /> <b>{percentage}%</b> less then you borrowed
                </>
              )}
            </>
          }
        />
      </div>
      <div className="w-full h-full p-4 shadow-xl rounded-lg bg-gray-600 sm:mb-2">
        <Chart
          data={{
            datasets: [
              {
                data: years.map((year, i) => ({
                  y: year.balance,
                  x: (new Date().getFullYear() + i).toString(),
                })),
                label: "Balance",
                backgroundColor: "#fff",
                borderColor: "#fff",
                tension: 0.1,
              },
              {
                data: years.map(({ accum }, i) => ({
                  y: accum,
                  x: (new Date().getFullYear() + i).toString(),
                })),
                label: "Accumulated Payment",
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                tension: 0.1,
              },
            ],
          }}
        />
      </div>
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
        `bg-gray-600 text-white p-2 flex-1 shadow-xl ${rounded ?? "rounded-lg"}`
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
