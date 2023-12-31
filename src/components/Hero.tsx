"use client";
import { useState } from "react";
import Form from "./Form/Form";
import { InformationCircle } from "./Icons";

export default function Hero() {
  return (
    <section className="md:pb-28 pt-28" id="hero">
      <div className="container px-4 mx-auto pb-10 md:pb-0">
        <div className="flex flex-wrap xl:items-center -mx-4">
          <Left />
          <Right />
        </div>
      </div>
    </section>
  );
}

const Left = () => {
  return (
    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
      <h1 className="mb-6 text-5xl  font-bold  text-center md:text-left">
        Calculate your student loan repayment
      </h1>
      <p className="mb-8 text-lg md:text-xl font-medium">
        Take Control of Your Student Loan Repayments Today! <br />
        Are you a UK student loan borrower struggling to understand your
        repayment obligations? <br />
        Say goodbye to confusion and uncertainty with our user-friendly Student
        Loan Repayment Calculator!
      </p>
      <div className="items-center w-full text-sm font-medium text-white rounded-lg flex bg-gray-600 bg-gray-600 text-white py-2 px-2 shadow-xl">
        <InformationCircle className="h-12 md:h-8" />
        <span className="ml-2">
          Please note this calculator is <b>not</b> financial advice. Please see{" "}
          <a
            href="https://www.gov.uk/government/organisations/student-loans-company"
            target="_blank"
          >
            <b>SLC</b>
          </a>{" "}
          for more information.
        </span>
      </div>
    </div>
  );
};

const Right = () => {
  return (
    <div className="w-full md:w-1/2 px-4">
      <div className="w-full p-4 mb-16 md:mb-0 shadow-xl rounded-lg mb-4 bg-white">
        <Form />
      </div>
    </div>
  );
};
