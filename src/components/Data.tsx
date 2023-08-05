"use client";
import { twMerge } from "tailwind-merge";
import { formatCurrency } from "@/utils";
import Chart from "./Chart";
import { Calculate } from "@/types";
import { ReactNode } from "react";

import DataTable from "./Table";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

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

const Right = (props: Calculate) => {
  const {} = props;
  return (
    <div className="w-full md:md:w-1/2 px-4">
      <div className="w-full flex flex-col justify-center p-4 mb-16 md:mb-0 shadow-xl rounded-lg mb-4 bg-gray-600 mt-2 md:mt-0">
        <DataTable {...props} />
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
const Left = ({
  originalBalance,
  monthly,
  yearly,
  weekly,
  loan: { years, totalPaid, isPaidOff, loanEndYear, loanDuration },
  loan100OverPay: { years: years100, totalPaid: totalPaid100 },
}: Calculate) => {
  const difference = totalPaid - originalBalance;
  const percentage = (Math.abs(difference / originalBalance) * 100).toFixed(2);
  const paidMore = originalBalance < totalPaid;

  const does100SaveMoney = totalPaid100 < totalPaid;
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
              <b>{loanEndYear - 1}</b>
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
              {(isPaidOff || paidMore) && (
                <>
                  You paid <b>{formatCurrency(difference)}</b> more than the
                  current balance of <b>{formatCurrency(originalBalance)}</b>
                </>
              )}
              {!isPaidOff && !paidMore && (
                <>
                  You have paid back only <b>{formatCurrency(totalPaid)}</b> out
                  of the <b>{formatCurrency(originalBalance)}</b> borrowed,
                  resulting in a deficit of{" "}
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
            does100SaveMoney ? (
              <>
                If you paid <b>£100</b> extra a month you&apos;d pay{" "}
                <b>{formatCurrency(totalPaid100)}</b> saving you{" "}
                <b>{formatCurrency(totalPaid - totalPaid100)}</b> and finish
                paying <b>{years.length - years100.length} years</b> quicker
              </>
            ) : (
              <>
                If you paid <b>£100</b> extra a month you&apos;d pay{" "}
                <b>{formatCurrency(totalPaid100)}</b> more costing you{" "}
                <b>{formatCurrency(totalPaid100 - totalPaid)}</b>
              </>
            )
          }
        />
      </div>
      <BrowserView>
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
      </BrowserView>
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
