"use client";
import * as Yup from "yup";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { useFormik } from "formik";
import { calculate, classNames } from "@/utils";
import { RepayKey } from "@/utils/const";
import LoanTypeRadio from "./LoanType";
const schema = Yup.object().shape({
  balance: Yup.number().min(1, "Too Short!").required("Please enter a balance"),
  salary: Yup.number().min(1, "Too Short!").required("Please enter a salary"),
  type: Yup.number().required("Required"),
});
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
    validationSchema: schema,
    initialErrors: {
      balance: "Please enter a balance",
      salary: "Please enter a salary",
    },
    onSubmit: (values) => {
      const { balance, salary, type } = values;
      onSubmit(calculate({ salary, type: type as RepayKey, balance }));
    },
  });
  return (
    <form className="w-full flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      {/* Line */}
      <div className="flex flex-wrap -mx-3">
        {/* Balance */}
        <div className="w-full px-3 mb-6 md:mb-0">
          <InputLabel htmlFor="balance">Student Loan Balance</InputLabel>
          <Input
            onChange={formik.handleChange}
            id={"balance"}
            name={"balance"}
            error={!!formik.errors.balance}
          />
          <ErrorLine text={formik.errors.balance} />
        </div>
      </div>
      {/* Line */}
      <div className="flex flex-wrap -mx-3">
        {/* Salary */}
        <div className="w-full px-3 mb-6 md:mb-0">
          <InputLabel htmlFor="salary">Gross Salary</InputLabel>
          <Input
            onChange={formik.handleChange}
            id={"salary"}
            name={"salary"}
            error={!!formik.errors.salary}
          />
          <ErrorLine text={formik.errors.salary} />
        </div>
      </div>
      {/* Line */}
      <LoanTypeRadio
        checked={formik.values.type}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          formik.setFieldValue("type", e.target.value);
        }}
      />
      <SubmitButton disabled={!formik.isValid} />
    </form>
  );
}

const SubmitButton = ({
  disabled,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      className="inline-block py-3 px-7 w-full text-base text-white font-medium text-center bg-gray-600 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 border border-gray-500 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Calculate
    </button>
  );
};
const InputLabel = ({
  htmlFor,
  children,
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
const Input = ({
  id,
  name,
  error,
  onChange,
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) => {
  return (
    <input
      className={classNames(
        error ? "border-red-500" : "",
        "appearance-none block w-full bg-gray-600200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      )}
      id={id}
      type="number"
      placeholder="£££££"
      name={name}
      onChange={onChange}
    />
  );
};
const ErrorLine = ({ text }: { text?: string }) => {
  return <p className="h-[16px] text-red-500 text-xs italic">{text}</p>;
};
