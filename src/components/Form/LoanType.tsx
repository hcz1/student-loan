"use client";

import { Tooltip } from "flowbite-react";
import { InformationCircle } from "../Icons";

export default function LoanTypeRadio({
  checked,
  onChange,
  year,
}: {
  checked: string;
  onChange: any;
  year?: number;
}) {
  const options = [
    {
      id: "loan-type-1",
      value: "1",
      label: "Plan 1",
      ttContent: (
        <span>
          Plan 1 is for students who started an undergraduate course before 1
          September 2012.
        </span>
      ),
      disabled: !!year && year >= 2012,
    },
    {
      id: "loan-type-2",
      value: "2",
      label: "Plan 2",
      ttContent: (
        <span>
          Plan 2 is for students who started an undergraduate course on or after
          1 September 2012
        </span>
      ),
      disabled: !!year && year < 2012,
    },
    {
      id: "loan-type-4",
      value: "4",
      label: "Plan 4",
      ttContent: (
        <span>
          Plan 4 is for students who started an undergraduate course on or after{" "}
          <br /> 1 September 2012 and took out a Postgraduate Loan for a
          Master`&apos;s course
        </span>
      ),
      disabled: !!year && year < 2012,
    },
    {
      id: "loan-type-5",
      value: "5",
      label: "Plan 5",
      ttContent: (
        <span>
          Plan 5 is for students who started an undergraduate course on or after{" "}
          <br />1 September 2012 and took out a Postgraduate Loan for a Doctoral
          course
        </span>
      ),
      disabled: !!year && year < 2012,
    },
  ];

  return (
    <div className="flex flex-wrap">
      <h3 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Loan Plan
      </h3>
      <ul className="items-center w-full text-sm font-medium text-white rounded-lg lg:flex bg-gray-600 bg-gray-600 text-white">
        {options.map(({ id, label, value, ttContent, disabled }) => {
          return (
            <li key={id} className="w-full">
              <div className="flex items-center px-3">
                <input
                  disabled={disabled}
                  id={id}
                  type="radio"
                  value={value}
                  checked={checked === value}
                  name="loan-type"
                  className="w-4 h-4 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={onChange}
                />
                <label
                  htmlFor={id}
                  className="w-full py-3 ml-2 text-sm font-medium"
                >
                  {label}
                </label>
                <Tooltip content={ttContent}>
                  <InformationCircle />
                </Tooltip>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
