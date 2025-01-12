"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "4/1", weight: 70 },
  { date: "4/5", weight: 69.5 },
  { date: "4/10", weight: 69.8 },
  { date: "4/15", weight: 69.2 },
  { date: "4/20", weight: 68.9 },
  { date: "4/25", weight: 68.5 },
  { date: "4/30", weight: 68.3 },
];

export function WeightChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
