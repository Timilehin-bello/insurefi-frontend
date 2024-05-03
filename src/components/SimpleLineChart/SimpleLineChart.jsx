import React, { PureComponent } from "react";
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
  { week: "0", green: 40000, red: 20000 },
  { week: "1w", green: 30000, red: 18000 },
  { week: "2w", green: 50000, red: 35000 },
  { week: "3w", green: 47000, red: 30000 },
  { week: "4w", green: 60000, red: 48000 },
  { week: "5w", green: 70000, red: 65000 },
  { week: "6w", green: 80000, red: 67000 },
];

const SimpleLineChat = () => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="none"
            vertical={true}
            horizontal={false}
          />
          <XAxis dataKey="week" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="green"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="red"
            stroke="#ff6347"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SimpleLineChat;
