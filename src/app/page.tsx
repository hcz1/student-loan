"use client";
import { About } from "@/components/About";
import Data from "@/components/Data/Data";
import Hero from "@/components/Hero";
import { useCalculator } from "./store/useCalculator";

export default function Home() {
  const { calculation } = useCalculator((state) => state);
  return (
    <>
      <Hero />
      {calculation && <Data />}
      <About />
    </>
  );
}
