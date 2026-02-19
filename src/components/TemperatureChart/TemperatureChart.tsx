"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./TemperatureChart.module.scss";

interface Props {
  data: { time: string; temp: number }[];
}

export default function TemperatureChart({ data }: Props) {
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#4facfe" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
