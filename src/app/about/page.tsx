import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About UK Student Loans",
  description:
    "Learn about different UK student loan plans, repayment thresholds, and additional information for student loan repayments in the UK.",
  keywords: [
    "UK student loans",
    "Plan 1",
    "Plan 2",
    "Plan 5",
    "Postgraduate Loans",
    "loan repayment",
  ],
};

const AboutPage: React.FC = () => {
  return (
    <div className="m-4 mt-8 md:m-0 p-6 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,255,0.3)] overflow-y-scroll max-h-[calc(100vh-20rem)]">
      <h1 className="text-4xl font-bold mb-6 uppercase">
        About UK Student Loans
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Plan 1</h2>
          <p>For courses started before 1 September 2012:</p>
          <ul className="list-disc list-inside ml-4">
            <li>
              Repayments begin after April once your income exceeds £24,990/year
            </li>
            <li>You repay 9% of your income above that threshold</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Plan 2</h2>
          <p>For courses between 1 September 2012 and 31 July 2023:</p>
          <ul className="list-disc list-inside ml-4">
            <li>
              Repayments start after April, with a threshold of £27,295/year
            </li>
            <li>You repay 9% of your income above that threshold</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Postgraduate Loans</h2>
          <p>
            For Master&apos;s and Doctoral courses started after 1 August 2016
            or 2018:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Repayments begin above £21,000/year</li>
            <li>You repay 6% of your income above that threshold</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Plan 5</h2>
          <p>For courses starting after 1 August 2023:</p>
          <ul className="list-disc list-inside ml-4">
            <li>
              Repayments begin after April 2026 at a £25,000/year threshold
            </li>
            <li>You repay 9% of your income above that threshold</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Additional Information
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>Provisions for voluntary repayments</li>
            <li>Repayments if you earn below the threshold</li>
            <li>Multiple plans if applicable</li>
          </ul>
        </section>

        <p className="mt-6">
          For detailed information, visit the{" "}
          <a
            href="https://www.gov.uk/repaying-your-student-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            full guide here
          </a>
          .
        </p>
      </div>
      <div className="mt-8">
        <Link
          href="/"
          className="text-lg font-bold uppercase border-2 border-black px-3 py-3 hover:bg-black hover:text-white transition-colors"
        >
          Back to Calculator
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
