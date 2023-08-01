"use client";
import { useState } from "react";
import Form from "./Form/Form";
import { formatCurrency } from "@/utils";
import Chart from "./Chart";
import { Calculate } from "@/types";

export default function Calculator() {
  const [state, setState] = useState<Calculate>({
    balance: 0,
    salary: 0,
    type: "1",
    monthly: 0,
    yearly: 0,
    weekly: 0,
    loan: { years: [], isPaidOff: false },
  });
  return (
    <section className="py-24 bg-white overflow-hidden" id="calculator">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <Left
            onSubmit={(values: Calculate) => {
              setState(values);
            }}
          />
          <Right {...state} />
        </div>
      </div>
    </section>
  );
}

const Left = ({ onSubmit }: any) => {
  return (
    <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0 shadow-xl rounded pt-6 pb-8 mb-4">
      <Form onSubmit={onSubmit} />
    </div>
  );
};

const Right = ({ monthly, yearly, weekly, loan: { years } }: Calculate) => {
  const data = {
    datasets: [
      {
        data: years.map((year, i) => ({
          y: year.balance,
          x: (new Date().getFullYear() + i).toString(),
        })),
        label: "Balance",
      },
    ],
  };
  console.log(data);
  return (
    <div className="w-full md:w-1/2 px-4 flex flex-col gap-5">
      You&apos;ll pay:
      <div className="flex gap-2 text-center">
        <Tag amount={formatCurrency(weekly)} time="week" />
        <Tag amount={formatCurrency(monthly)} time="month" />
        <Tag amount={formatCurrency(yearly)} time="year" />
      </div>
      <Chart data={data} />
    </div>
  );
};
function Tag({ amount, time }: { amount: string; time: string }) {
  return (
    <p className="bg-gray-600 text-white p-2 rounded flex-1 shadow-xl">
      {amount} <br /> per {time}
    </p>
  );
}
