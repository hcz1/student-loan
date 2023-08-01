"use client";
import Calculator from "@/components/Calculator";
import Hero from "@/components/Hero";
import { Calculate } from "@/types";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState<Calculate>({
    balance: 0,
    salary: 0,
    type: "1",
    monthly: 0,
    yearly: 0,
    weekly: 0,
    loan: { years: [], isPaidOff: false },
  });
  return (
    <>
      <Hero
        onSubmit={(values: any) => {
          setState(values);
        }}
      />
      <Calculator {...state} />
    </>
  );
}
