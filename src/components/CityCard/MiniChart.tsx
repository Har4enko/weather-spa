"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";
import styles from "./MiniChart.module.scss";

interface Props {
  data: { time: string; temp: number }[];
}

export default function MiniChart({ data }: Props) {
  return (
    <div className={styles.miniChart}>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
