import styled from "styled-components";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
const data = [
  {
    name: "Correct",
    count: 100,
    color: "#1DE28D",
  },
  {
    name: "Incorrect",
    count: 400,
    color: "#FB2404",
  },
  {
    name: "Skipped",
    count: 100,
    color: "#F6E609",
  },
];
const DashboardAnalyticsHolder = styled.div`
  height: 170px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function DashboardAnalytics() {
  return (
    <DashboardAnalyticsHolder>
      <ResponsiveContainer height="100%" widht="100%">
        <PieChart data={data}>
          <Pie
            cx="50%"
            cy="50%"
            outerRadius={50}
            label
            data={data}
            fill={"#13b2ec"}
            dataKey="count"
            nameKey="name"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </DashboardAnalyticsHolder>
  );
}
