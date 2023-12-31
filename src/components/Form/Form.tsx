"use client";
import * as Yup from "yup";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import { useFormik } from "formik";
import { classNames } from "@/utils";
import { CONFIG, RepayKey } from "@/utils/const";
import LoanTypeRadio from "./LoanType";
import { CurrencyPoundIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "flowbite-react";
import { InformationCircle } from "../Icons";
import { useCalculator } from "@/app/store/useCalculator";

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

export default function Form() {
  const { handleCalculation } = useCalculator((state) => state);
  const formik = useFormik({
    initialValues: {
      balance: undefined,
      salary: undefined,
      type: "1",
      year_started: 2012,
      duration: 3,
    },
    validationSchema: schema,
    validateOnMount: false,
    onSubmit: (values) => {
      const { balance, salary, type, year_started, duration } = values;
      if (balance && salary && type && year_started && duration) {
        handleCalculation({
          salary,
          type: type as RepayKey,
          balance,
          startYear: year_started,
          duration,
        });
      }
    },
  });
  return (
    <form
      className="w-full flex flex-col gap-2 min-h-[462px]"
      onSubmit={formik.handleSubmit}
    >
      <FormLine>
        {/* Balance */}
        <div className="w-full px-3">
          <InputLabel
            toolTipContent={CONFIG.INITAL_BALANCE_TOOLTIP}
            htmlFor="balance"
          >
            {CONFIG.INITAL_BALANCE_LABEL}
          </InputLabel>
          <Input
            onBlur={formik.handleBlur}
            step=".01"
            onChange={formik.handleChange}
            id={"balance"}
            name={"balance"}
            error={!!formik.errors.balance && formik.touched.balance}
            withIcon={<CurrencyPoundIcon className="absolute w-8 h-8 ml-2" />}
          />
          <ErrorLine
            text={formik.touched.balance ? formik.errors.balance : ""}
          />
        </div>
      </FormLine>
      <FormLine>
        {/* Salary */}
        <div className="w-full px-3">
          <InputLabel toolTipContent={CONFIG.SALARY_TOOLTIP} htmlFor="salary">
            {CONFIG.SALARY_LABEL}
          </InputLabel>

          <Input
            onBlur={formik.handleBlur}
            step=".01"
            onChange={formik.handleChange}
            id={"salary"}
            name={"salary"}
            error={!!formik.errors.salary && formik.touched.salary}
            withIcon={<CurrencyPoundIcon className="absolute w-8 h-8 ml-2" />}
          />
          <ErrorLine text={formik.touched.salary ? formik.errors.salary : ""} />
        </div>
      </FormLine>
      <FormLine className="items-end">
        {/* Year */}
        <div className="w-1/2 px-3">
          <InputLabel htmlFor="year_started">
            {CONFIG.INITAL_YEAR_LABEL}
          </InputLabel>
          <Input
            onBlur={formik.handleBlur}
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
            error={!!formik.errors.year_started && formik.touched.year_started}
            min={2000}
            max={new Date().getFullYear()}
            value={formik.values.year_started}
          />
          <ErrorLine
            text={formik.touched.year_started ? formik.errors.year_started : ""}
          />
        </div>
        {/* Duration */}
        <div className="w-1/2 px-3">
          <InputLabel htmlFor="duration">
            {CONFIG.COURSE_DURATION_LABEL}
          </InputLabel>
          <Input
            onBlur={formik.handleBlur}
            placeholder="3"
            onChange={formik.handleChange}
            id={"duration"}
            name={"duration"}
            error={!!formik.errors.duration && formik.touched.duration}
            value={formik.values.duration}
            min={1}
            max={7}
          />
          <ErrorLine
            text={formik.touched.duration ? formik.errors.duration : ""}
          />
        </div>
      </FormLine>
      <FormLine>
        <div className="w-full px-3">
          <LoanTypeRadio
            onBlur={formik.handleBlur}
            checked={formik.values.type}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue("type", e.target.value);
            }}
            year={formik.values.year_started}
          />
        </div>
      </FormLine>
      <FormLine>
        <div className="w-full px-3">
          <SubmitButton disabled={!formik.isValid} />
        </div>
      </FormLine>
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
        onClick && onClick(e);
        setTimeout(() => {
          document
            .querySelector("#results")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 200);
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
  toolTipContent,
  children,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement> & { toolTipContent?: ReactNode }) => {
  return (
    <div className="flex items-center gap-1 mb-2">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
        htmlFor={htmlFor}
        {...rest}
      >
        {children}
      </label>
      {!!toolTipContent && (
        <Tooltip id={"tooltip-" + htmlFor} content={toolTipContent}>
          <InformationCircle className="h-5" />
        </Tooltip>
      )}
    </div>
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

const FormLine = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={`flex flex-wrap -mx-3 ${className}`}>{children}</div>;
};
