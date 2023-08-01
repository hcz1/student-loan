"use client";
import Form from "./Form/Form";

export default function Hero() {
  return (
    <section className="md:pb-28">
      <div className="container px-4 mx-auto">
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
    <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
      <h1 className="mb-6 text-2xl md:text-4xl lg:text-5xl leading-tight font-bold tracking-tight">
        Calculate your student loan repayment
      </h1>
      <p className="mb-8 text-lg md:text-xl font-medium">
        Take Control of Your Student Loan Repayments Today! <br />
        Are you a UK student loan borrower struggling to understand your
        repayment obligations? <br />
        Say goodbye to confusion and uncertainty with our user-friendly Student
        Loan Repayment Calculator!
      </p>
      <div className="flex flex-wrap">
        <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
          <a href="#calculator">
            <button className="inline-block py-3 px-7 w-full text-base text-white font-medium text-center bg-gray-600 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md shadow-sm">
              Calculator
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const Right = () => {
  return (
    <div className="w-full md:w-1/2 px-4">
      <div className="w-full px-4 mb-16 md:mb-0 shadow-xl rounded pt-6 pb-8 mb-4 bg-white">
        <Form />
      </div>
    </div>
  );
};
