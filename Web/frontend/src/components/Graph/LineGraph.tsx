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

export interface props {
  isBig: boolean;
  x_Data: string[];
  y_Data: number[];
}

export default function LineGraph({ isBig, x_Data, y_Data }: props) {
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
  };
  const data: any = {
    labels: x_Data,
    datasets: [
      {
        label: "Upload Freq",
        data: y_Data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return isBig ? (
    <Line options={options} data={data} />
  ) : (
    <div style={{ width: "24vx", height: "20vh" }}>
      <Line options={options} data={data} />
    </div>
  );
}
