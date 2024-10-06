export const REPAY = {
  2024: {
    "1": {
      yearlyThreashold: 24_990,
      monthlyThreashold: 2083,
      weeklyThreashold: 480,
      percentage: 0.09,
      interest: 0.0625,
      writtenOff: 25,
    },
    "2": {
      yearlyThreashold: 27_295,
      monthlyThreashold: 2_274,
      weeklyThreashold: 524,
      percentage: 0.09,
      interest: 0.079,
      writtenOff: 30,
    },
    "4": {
      yearlyThreashold: 31_395,
      monthlyThreashold: 2616,
      weeklyThreashold: 603,
      percentage: 0.09,
      interest: 0.0625,
      writtenOff: 30,
    },
    "5": {
      yearlyThreashold: 25_000,
      monthlyThreashold: 2_083,
      weeklyThreashold: 480,
      percentage: 0.09,
      interest: 0.079,
      writtenOff: 40,
    },
    "6": {
      yearlyThreashold: 21_000,
      monthlyThreashold: 1_750,
      weeklyThreashold: 403,
      percentage: 0.06,
      interest: 0.079,
      writtenOff: 30,
    },
  },
  2023: {
    "1": {
      yearlyThreashold: 22_015,
      monthlyThreashold: 1_834,
      weeklyThreashold: 423,
      percentage: 0.09,
      interest: 0.0625,
      writtenOff: 25,
    },
    "2": {
      yearlyThreashold: 27_295,
      monthlyThreashold: 2_274,
      weeklyThreashold: 524,
      percentage: 0.09,
      interest: 0.073,
      writtenOff: 30,
    },
    "4": {
      yearlyThreashold: 27_660,
      monthlyThreashold: 2_305,
      weeklyThreashold: 532,
      percentage: 0.09,
      interest: 0.0625,
      writtenOff: 30,
    },
    "5": {
      yearlyThreashold: 25_000,
      monthlyThreashold: 2_083,
      weeklyThreashold: 480,
      percentage: 0.09,
      interest: 0.073,
      writtenOff: 40,
    },
    "6": {
      yearlyThreashold: 21_000,
      monthlyThreashold: 1_750,
      weeklyThreashold: 403,
      percentage: 0.06,
      interest: 0.073,
      writtenOff: 30,
    },
  },
} as const;

export type RepayKey = keyof (typeof REPAY)["2024"];
const SLC_BALANCE_LINK =
  "https://www.gov.uk/repaying-your-student-loan/what-you-pay";
export const CONFIG = {
  BMC_LINK: "https://bmc.link/hczdev",
  BMC_TEXT: "Buy me a coffee",
  SLC_REPAY_LINK: "https://www.gov.uk/repaying-your-student-loan/what-you-pay",
  SLC_BALANCE_LINK,

  INITAL_BALANCE_LABEL: "Student Loan Balance",
  INITAL_BALANCE_TOOLTIP: (
    <span>
      If unknown, you can find your student loan balance by logging into your{" "}
      <a href={SLC_BALANCE_LINK} target="_blank">
        <b>Student Finance account</b>
      </a>
      .
    </span>
  ),
  SALARY_LABEL: "Gross Salary",
  SALARY_TOOLTIP: (
    <span>
      Your gross salary is the amount of money you&apos;ve made at a given job
      before deductions. <br />
      This is usually shown at the top of your payslip, before any deductions
      are taken out of your pay. <br />
      It will be the salary figure stated in your employment contract—a fixed
      amount usually paid monthly over a year
    </span>
  ),
  INITAL_YEAR_LABEL: "Initial year of the course",
  COURSE_DURATION_LABEL: "Course Duration",
};
