import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function PieChart({ data }: { data?: any }) {
  return (
    <Pie
      options={{
        scales: {},
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#fff",
            },
          },
          title: {},
        },
      }}
      data={data}
    />
  );
}
