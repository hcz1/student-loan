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
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface CalculatorFormProps {
  className?: string;
  onCalculate: (loanDetails: LoanDetails) => void;
}

export function CalculatorForm({
  className,
  onCalculate,
}: CalculatorFormProps) {
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
  const [interestRate, setInterestRate] = useState(0.7);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

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
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div>
        <Label htmlFor="loanBalance" className="text-lg font-bold">
          Current Loan Balance
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-bold">
            £
          </span>
          <Input
            id="loanBalance"
            type="number"
            value={loanBalance}
            onChange={(e) => setLoanBalance(e.target.value)}
            className="mt-1 w-full border-2 border-black text-lg p-2 pl-8"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="loanType" className="text-lg font-bold">
          Loan Type
        </Label>
        <Select onValueChange={setLoanType} required value={loanType}>
          <SelectTrigger
            id="loanType"
            className="mt-1 w-full border-2 border-black text-lg p-2 bg-white focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue placeholder="Select loan type" />
          </SelectTrigger>
          <SelectContent className="border-2 border-black">
            <SelectItem value="plan1" className="text-lg cursor-pointer">
              Plan 1
            </SelectItem>
            <SelectItem value="plan2" className="text-lg cursor-pointer">
              Plan 2
            </SelectItem>
            <SelectItem value="plan4" className="text-lg cursor-pointer">
              Plan 4
            </SelectItem>
            <SelectItem value="plan5" className="text-lg cursor-pointer">
              Plan 5
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="grossSalary" className="text-lg font-bold">
          Current Gross Salary
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-bold">
            £
          </span>
          <Input
            id="grossSalary"
            type="number"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            className="mt-1 w-full border-2 border-black text-lg p-2 pl-8"
            required
          />
        </div>
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
          <div className="flex-1 relative">
            <Input
              id="courseDuration"
              type="number"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              className="w-full border-2 border-black text-lg p-2 pr-16"
              placeholder="Duration"
              required
              min={1}
              max={10}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-bold">
              years
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="advanced-mode"
          checked={isAdvancedMode}
          onCheckedChange={setIsAdvancedMode}
        />
        <Label htmlFor="advanced-mode" className="text-lg">
          Advanced Mode
        </Label>
      </div>

      {isAdvancedMode && (
        <>
          <div>
            <Label htmlFor="interestRate" className="text-lg font-bold">
              Interest Rate (%)
            </Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-1 w-full border-2 border-black text-lg p-2"
              step="0.1"
              min="0"
              max="100"
            />
          </div>
          {/* Add more advanced fields as needed */}
        </>
      )}

      <Button
        type="submit"
        className="w-full bg-black text-white text-xl font-bold py-3 hover:bg-gray-800"
      >
        Calculate Repayment
      </Button>
    </form>
  );
}
