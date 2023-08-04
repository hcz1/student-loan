export const REPAY = {
  2023: {
    "1": {
      yearlyThreashold: 22_015,
      monthlyThreashold: 1_834,
      weeklyThreashold: 423,
      percentage: 0.09,
      interest: 0.06,
    },
    "2": {
      yearlyThreashold: 27_295,
      monthlyThreashold: 2_274,
      weeklyThreashold: 524,
      percentage: 0.09,
      interest: 0.071,
    },
    "4": {
      yearlyThreashold: 27_660,
      monthlyThreashold: 2_305,
      weeklyThreashold: 532,
      percentage: 0.09,
      interest: 0.06,
    },
    "5": {
      yearlyThreashold: 25_000,
      monthlyThreashold: 2_083,
      weeklyThreashold: 480,
      percentage: 0.09,
      interest: 0.071,
    },
    "6": {
      yearlyThreashold: 21_000,
      monthlyThreashold: 1_750,
      weeklyThreashold: 403,
      percentage: 0.06,
      interest: 0.071,
    },
  },
} as const;

export type RepayKey = keyof (typeof REPAY)["2023"];
