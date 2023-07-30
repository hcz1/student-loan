"use client";
import { calculate } from "@/utils";
import { RepayKey } from "@/utils/const";
import { useFormik } from "formik";
import { ChangeEvent } from "react";
import LoanTypeRadio from "./LoanType";
interface FormProps {
  onSubmit: (values: {
    monthly: number;
    yearly: number;
    weekly: number;
  }) => void;
}
export default function Form({ onSubmit }: FormProps) {
  const formik = useFormik({
    initialValues: { balance: 0, salary: 0, type: "1" },
    onSubmit: (values) => {
      const { balance, salary, type } = values;
      onSubmit(calculate({ salary, type: parseInt(type) as RepayKey }));
    },
  });
  return (
    <form className="w-full flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      {/* Line */}
      <div className="flex flex-wrap -mx-3">
        {/* Balance */}
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="balance"
          >
            Student Loan Balance
          </label>
          <input
            className="appearance-none block w-full bg-gray-600200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="balance"
            type="text"
            placeholder="£££££"
            name="balance"
            onChange={formik.handleChange}
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
      </div>
      {/* Line */}
      <div className="flex flex-wrap -mx-3">
        {/* Salary */}
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="salary"
          >
            Gross Salary
          </label>
          <input
            className="appearance-none block w-full bg-gray-600200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="salary"
            type="text"
            placeholder="£££££"
            name="salary"
            onChange={formik.handleChange}
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
      </div>
      {/* Line */}
      <LoanTypeRadio
        checked={formik.values.type}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          formik.setFieldValue("type", e.target.value);
        }}
      />

      <div>
        <button className="inline-block py-3 px-7 w-full text-base text-white font-medium text-center bg-gray-600 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 border border-gray-500 rounded-md shadow-sm">
          Calculate
        </button>
      </div>
    </form>
  );
}
