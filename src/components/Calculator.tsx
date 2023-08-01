"use client";
import { formatCurrency } from "@/utils";
import Chart from "./Chart";
import { Calculate } from "@/types";

export default function Calculator(props: any) {
  return (
    <section className="py-24 bg-white overflow-hidden" id="calculator">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* <Left
            onSubmit={(values: Calculate) => {
              setState(values);
            }}
          /> */}
          <Right {...props} />
        </div>
      </div>
    </section>
  );
}

const Left = ({ onSubmit }: any) => {
  return (
    <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0 shadow-xl rounded pt-6 pb-8 mb-4"></div>
  );
};
const Right = ({ monthly, yearly, weekly, loan: { years } }: Calculate) => {
  return (
    <div className="w-full md:w-1/2 px-4 flex flex-col gap-5">
      You&apos;ll pay:
      <div className="flex gap-2 text-center">
        <Tag amount={formatCurrency(weekly)} time="week" />
        <Tag amount={formatCurrency(monthly)} time="month" />
        <Tag amount={formatCurrency(yearly)} time="year" />
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
            },
          ],
        }}
      />
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
