import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | UK Student Loan Repayment Calculator",
  description:
    "Terms of Use for the UK Student Loan Repayment Calculator. Read our terms and conditions for using this calculator.",
};

export default function TermsOfUse() {
  return (
    <div className="m-4 mt-8 md:m-0 p-6 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,255,0.3)] flex-grow flex flex-col overflow-y-scroll max-h-[calc(100vh-20rem)]">
      <h1 className="text-4xl font-bold mb-6 uppercase">Terms of Use</h1>
      <div className="space-y-4">
        <p>
          Welcome to the UK Student Loan Repayment Calculator. By using this
          website, you agree to comply with and be bound by the following terms
          and conditions of use.
        </p>
        <h2 className="text-2xl font-bold mt-6">1. Acceptance of Terms</h2>
        <p>
          By accessing and using this calculator, you accept and agree to be
          bound by the terms and provision of this agreement.
        </p>
        <h2 className="text-2xl font-bold mt-6">2. Use of Calculator</h2>
        <p>
          This calculator is provided for informational purposes only. The
          results should not be considered as financial advice. We recommend
          consulting with a qualified financial advisor for personalized
          guidance.
        </p>
        <h2 className="text-2xl font-bold mt-6">3. Accuracy of Information</h2>
        <p>
          While we strive to provide accurate and up-to-date information, we
          make no representations or warranties of any kind, express or implied,
          about the completeness, accuracy, reliability, suitability or
          availability of the calculator or the information it provides.
        </p>
        <h2 className="text-2xl font-bold mt-6">4. Limitation of Liability</h2>
        <p>
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising from loss of data or profits arising out of,
          or in connection with, the use of this calculator.
        </p>
        <h2 className="text-2xl font-bold mt-6">5. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued
          use of the calculator after any such changes constitutes your
          acceptance of the new terms.
        </p>
        <h2 className="text-2xl font-bold mt-6">6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of the United Kingdom.
        </p>
      </div>
    </div>
  );
}
