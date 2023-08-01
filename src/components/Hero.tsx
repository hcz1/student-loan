"use client";
import Image from "next/image";

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
      <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
        Calculate your student loan repayment
      </h1>
      <p className="mb-8 text-lg md:text-xl font-medium">
        Take Control of Your Student Loan Repayments Today! Are you a UK student
        loan borrower struggling to understand your repayment obligations? Say
        goodbye to confusion and uncertainty with our user-friendly Student Loan
        Repayment Calculator!
      </p>
      <div className="flex flex-wrap">
        <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
          <a href="#calculator">
            <button className="inline-block py-3 px-7 w-full text-base text-white font-medium text-center bg-gray-600 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 border border-gray-500 rounded-md shadow-sm">
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
      <div className="relative mx-auto md:mr-0 max-w-max">
        <Image
          width={1770}
          height={80}
          alt="Student Loan Repayment Calculator"
          className="relative rounded"
          src={
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          }
        />
      </div>
    </div>
  );
};
