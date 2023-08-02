"use client";
import Data from "@/components/Data";
import Hero from "@/components/Hero";
import { Calculate } from "@/types";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState<Calculate>({
    balance: 0,
    salary: 0,
    type: "1",
    originalBalance: 0,
    monthly: 0,
    yearly: 0,
    weekly: 0,
    hasCalculated: false,
    loan: {
      years: [],
      isPaidOff: false,
      totalPaid: 0,
      loanEndYear: 0,
      loanDuration: 0,
    },
  });
  return (
    <>
      <Hero
        onSubmit={(values: any) => {
          setState({ ...values, hasCalculated: true });
        }}
      />
      {state.hasCalculated && <Data {...state} />}
    </>
  );
}
