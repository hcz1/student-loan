"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LoanDetails } from "@/types/loan";
import { useSearchParams } from "next/navigation";

interface CalculatorFormProps {
  onCalculate: (loanDetails: LoanDetails) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const searchParams = useSearchParams();
  const loanAmountParams = searchParams.get("loanAmount");
  const loanTypeParams = searchParams.get("loanType");
  const grossSalaryParams = searchParams.get("grossSalary");
  const courseStartYearParams = searchParams.get("courseStartYear");
  const courseDurationParams = searchParams.get("courseDuration");

  const [loanBalance, setLoanBalance] = useState(loanAmountParams || "");
  const [loanType, setLoanType] = useState(loanTypeParams || "");
  const [grossSalary, setGrossSalary] = useState(grossSalaryParams || "");
  const [courseStartYear, setCourseStartYear] = useState(
    courseStartYearParams || ""
  );
  const [courseDuration, setCourseDuration] = useState(
    courseDurationParams || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      loanBalance: parseFloat(loanBalance),
      loanType,
      grossSalary: parseFloat(grossSalary),
      courseStartYear: parseInt(courseStartYear),
      courseDuration: parseInt(courseDuration),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="loanBalance" className="text-lg font-bold">
          Current Loan Balance (£)
        </Label>
        <Input
          id="loanBalance"
          type="number"
          value={loanBalance}
          onChange={(e) => setLoanBalance(e.target.value)}
          className="mt-1 w-full border-2 border-black text-lg p-2"
          required
        />
      </div>
      <div>
        <Label htmlFor="loanType" className="text-lg font-bold">
          Loan Type
        </Label>
        <Select onValueChange={setLoanType} required value={loanType}>
          <SelectTrigger
            id="loanType"
            className="mt-1 w-full border-2 border-black text-lg p-2"
          >
            <SelectValue placeholder="Select loan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plan1">Plan 1</SelectItem>
            <SelectItem value="plan2">Plan 2</SelectItem>
            <SelectItem value="plan4">Plan 4</SelectItem>
            <SelectItem value="plan5">Plan 5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="grossSalary" className="text-lg font-bold">
          Current Gross Salary (£)
        </Label>
        <Input
          id="grossSalary"
          type="number"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          className="mt-1 w-full border-2 border-black text-lg p-2"
          required
        />
      </div>
      <div>
        <Label className="text-lg font-bold">Course Details</Label>
        <div className="flex mt-1 space-x-2">
          <div className="flex-1">
            <Input
              id="courseStartYear"
              type="number"
              value={courseStartYear}
              onChange={(e) => setCourseStartYear(e.target.value)}
              className="w-full border-2 border-black text-lg p-2"
              placeholder="Start Year"
              required
              min={1990}
              max={new Date().getFullYear()}
            />
          </div>
          <div className="flex-1 flex items-center">
            <Input
              id="courseDuration"
              type="number"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              className="w-full border-2 border-black text-lg p-2"
              placeholder="Duration"
              required
              min={1}
              max={10}
            />
            <span className="ml-2 text-lg font-bold whitespace-nowrap">
              years
            </span>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-black text-white text-xl font-bold py-3 hover:bg-gray-800"
      >
        Calculate Repayment
      </Button>
    </form>
  );
}
