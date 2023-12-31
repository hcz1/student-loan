import { useCalculator } from "@/app/store/useCalculator";
import { formatCurrency } from "@/utils";
import { CONFIG, REPAY, RepayKey } from "@/utils/const";

const Assumptions = () => {
  const { calculation } = useCalculator((state) => state);
  return (
    <div className="px-3">
      <div>
        <h3 className="block uppercase tracking-wide text-s font-bold mr-1">
          Interest Rates - 2023 -{" "}
          <a href={CONFIG.SLC_REPAY_LINK} target="_blank" className="underline">
            Gov Link
          </a>
        </h3>
        <p>
          Interest rates and repyment thresholds for each plan type, we assume
          the same interest rate for the entirity of the loan:
        </p>
      </div>
      {/* here */}
      {calculation?.type && <GenerateAssumptions type={calculation.type} />}
      <h3 className="block underline uppercase tracking-wide text-s font-bold mr-1">
        Salary
      </h3>
      <p>
        We assume the same salary for the entirity of the loan, soon there will
        be a feature to change this to a percentage yearly growth.
      </p>
    </div>
  );
};
export default Assumptions;

const GenerateAssumptions = ({ type }: { type: RepayKey }) => {
  const { interest, yearlyThreashold, percentage } = REPAY["2023"][type];

  const _key = type === "6" ? "Postgraduate Loan" : "Plan " + type;

  return (
    <div>
      <h3 className="block underline uppercase tracking-wide text-s font-bold mr-1">
        {_key}
      </h3>
      <p>
        <b>{interest * 100}%</b> interest and a yearly payment threshold of{" "}
        <b>{formatCurrency(yearlyThreashold)}</b> where you pay{" "}
        <b>{percentage * 100}%</b> over this
      </p>
    </div>
  );
};
