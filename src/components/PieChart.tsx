import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function PieChart({ data }: { data?: any }) {
  return (
    <Pie
      options={{
        // scales: {
        //   y: {
        //     ticks: {
        //       callback: function (value: any, index: any, values: any) {
        //         return formatCurrency(value);
        //       },
        //     },
        //   },
        // },
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {},
        },
      }}
      data={data}
    />
  );
}
