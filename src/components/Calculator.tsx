"use client";
import { useState } from "react";
import Form from "./Form/Form";
import { formatCurrency } from "@/utils";
export default function Calculator() {
  const [state, setState] = useState({ monthly: 0, yearly: 0, weekly: 0 });
  return (
    <section className="py-24 bg-white overflow-hidden" id="calculator">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <Left
            onSubmit={(values: {
              monthly: number;
              weekly: number;
              yearly: number;
            }) => {
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
    <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0 shadow-md rounded pt-6 pb-8 mb-4">
      <Form onSubmit={onSubmit} />
    </div>
  );
};

interface RightProps {
  monthly: number;
  yearly: number;
  weekly: number;
}
const Right = ({ monthly, yearly, weekly }: RightProps) => {
  return (
    <div className="w-full md:w-1/2 px-4 flex flex-col gap-5">
      You&apos;ll pay:
      <Tag text={`${formatCurrency(weekly)} per week`} />
      <Tag text={`${formatCurrency(monthly)} per month`} />
      <Tag text={`${formatCurrency(yearly)} per year`} />
    </div>
  );
};
function Tag({ text }: { text: string }) {
  return (
    <div className="">
      <p className="max-w-[200px]  bg-gray-600 text-white p-2 rounded">
        {text}
      </p>
    </div>
  );
}
