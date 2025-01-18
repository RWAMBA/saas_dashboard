"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface OverviewData {
  date: string;
  totalVisits: number;
}

interface OverviewProps {
  data: OverviewData[];
}

export function Overview({ data }: OverviewProps) {
  // Format the data to ensure dates are properly formatted
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'MMM d'),
    totalVisits: Number(item.totalVisits)
  }));

  return (
    <div data-export-chart className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalVisits"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 