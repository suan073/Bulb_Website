import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

type props = {
  data: JSON[];
  xName: string;
  lineName: string;
};

export default function LineGraph(props: props) {
  return (
    <ResponsiveContainer width="90%" height="60%">
      <LineChart data={props.data} margin={{ top: 5, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={props.xName} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={props.lineName} stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
}
