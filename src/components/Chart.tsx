import { formatCurrency } from "@/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ data }: { data?: any }) {
  return (
    <Line
      options={{
        scales: {
          y: {
            ticks: {
              callback: function (value: any, index: any, values: any) {
                return formatCurrency(value);
              },
            },
          },
        },
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
