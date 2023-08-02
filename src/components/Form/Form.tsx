"use client";
import * as Yup from "yup";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import { useFormik } from "formik";
import { calculate, classNames } from "@/utils";
import { RepayKey } from "@/utils/const";
import LoanTypeRadio from "./LoanType";
import { CurrencyPoundIcon } from "@heroicons/react/24/outline";

const schema = Yup.object().shape({
  balance: Yup.number()
    .min(1, "Trying to break the system?")
    .required("Please enter a balance"),
  salary: Yup.number()
    .min(1, "Trying to break the system?")
    .required("Please enter a salary"),
  type: Yup.number().required("Required"),
  year_started: Yup.number().required("Please enter a year"),
  duration: Yup.number().required("Please enter a duration"),
});
interface FormProps {
  onSubmit?: (values: {
    monthly: number;
    yearly: number;
    weekly: number;
  }) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const formik = useFormik({
    initialValues: {
      balance: undefined,
      salary: undefined,
      type: "1",
      year_started: undefined,
      duration: undefined,
    },
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      const { balance, salary, type } = values;
      if (onSubmit && balance && salary && type) {
        onSubmit(calculate({ salary, type: type as RepayKey, balance }));
      }
    },
  });
  return (
    <form className="w-full flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      {/* Line */}
      <div className="flex flex-wrap -mx-3">
        {/* Balance */}
        <div className="w-full px-3">
          <InputLabel htmlFor="balance">Student Loan Balance</InputLabel>
          <Input
            onChange={formik.handleChange}
            id={"balance"}
            name={"balance"}
            error={!!formik.errors.balance}
            withIcon={<CurrencyPoundIcon className="absolute w-8 h-8 ml-2" />}
          />
          <ErrorLine text={formik.errors.balance} />
        </div>
      </div>
      {/* Line */}
      <div className="flex flex-wrap -mx-3">
        {/* Salary */}
        <div className="w-full px-3">
          <InputLabel htmlFor="salary">Gross Salary</InputLabel>
          <Input
            onChange={formik.handleChange}
            id={"salary"}
            name={"salary"}
            error={!!formik.errors.salary}
            withIcon={<CurrencyPoundIcon className="absolute w-8 h-8 ml-2" />}
          />
          <ErrorLine text={formik.errors.salary} />
        </div>
      </div>
      {/* Line */}
      <div className="flex flex-wrap -mx-3">
        {/* Year */}
        <div className="w-1/2 px-3">
          <InputLabel htmlFor="year_started">Year Started</InputLabel>
          <Input
            placeholder="2015"
            onChange={(e) => {
              if (
                formik.values.type === "1" &&
                parseInt(e.target.value) >= 2012
              ) {
                formik.setFieldValue("type", "2");
              } else if (
                formik.values.type !== "1" &&
                parseInt(e.target.value) < 2012
              ) {
                formik.setFieldValue("type", "1");
              }
              formik.handleChange(e);
            }}
            id={"year_started"}
            name={"year_started"}
            error={!!formik.errors.year_started}
            min={2000}
            max={new Date().getFullYear()}
          />
          <ErrorLine text={formik.errors.year_started} />
        </div>
        {/* Duration */}
        <div className="w-1/2 px-3">
          <InputLabel htmlFor="duration">Course Duration</InputLabel>
          <Input
            placeholder="3"
            onChange={formik.handleChange}
            id={"duration"}
            name={"duration"}
            error={!!formik.errors.duration}
            min={3}
            max={7}
          />
          <ErrorLine text={formik.errors.duration} />
        </div>
      </div>
      {/* Line */}
      <LoanTypeRadio
        checked={formik.values.type}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          formik.setFieldValue("type", e.target.value);
        }}
        year={formik.values.year_started}
      />
      <SubmitButton disabled={!formik.isValid} />
    </form>
  );
}

const SubmitButton = ({
  disabled,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={(e) => {
        document
          .querySelector("#calculator")
          ?.scrollIntoView({ behavior: "smooth" });
        onClick && onClick(e);
      }}
      type="submit"
      disabled={disabled}
      className="inline-block py-3 px-7 w-full text-base text-white font-medium text-center bg-gray-600 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
  error,
  withIcon,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  withIcon?: ReactNode;
}) => {
  return (
    <div className="flex items-center">
      {!!withIcon && withIcon}
      <input
        required
        className={classNames(
          error ? "border-red-500" : "",
          !!withIcon ? "pl-12 pr-4" : "px-4",
          "shadow-xl appearance-none block w-full text-gray-700 border rounded-lg py-3  leading-tight focus:outline-none focus:bg-white"
        )}
        type="number"
        {...rest}
      />
    </div>
  );
};
const ErrorLine = ({ text }: { text?: string }) => {
  return <p className="h-[16px] text-red-500 text-xs italic">{text}</p>;
};
