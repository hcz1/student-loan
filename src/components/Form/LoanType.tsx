"use client";
export default function LoanTypeRadio({
  checked,
  onChange,
}: {
  checked: string;
  onChange: any;
}) {
  const options = [
    { id: "loan-type-1", value: "1", label: "Plan 1" },
    { id: "loan-type-2", value: "2", label: "Plan 2" },
    { id: "loan-type-4", value: "4", label: "Plan 4" },
    { id: "loan-type-5", value: "5", label: "Plan 5" },
  ];
  return (
    <div className="flex flex-wrap">
      <h3 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Loan Plan
      </h3>
      <ul className="items-center w-full text-sm font-medium text-white bg-white border border-gray-800 rounded-lg sm:flex dark:bg-gray-600 dark:bg-gray-600 dark:text-white">
        {options.map(({ id, label, value }) => {
          return (
            <li
              key={id}
              className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div className="flex items-center pl-3">
                <input
                  id={id}
                  type="radio"
                  value={value}
                  checked={checked === value}
                  name="loan-type"
                  className="w-4 h-4 bg-gray-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={onChange}
                />
                <label
                  htmlFor={id}
                  className="w-full py-3 ml-2 text-sm font-medium"
                >
                  {label}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
