import React from "react";
import {
  Bar,
  Text,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  BarChart,
  CartesianGrid,
} from "recharts";
import { COLORS } from "../../../utils/consts";
import "../../../styles/analytics/analytics.css";

const TopEmployees = ({ owners, getOwners }) => {
  return (
    <div className="chart-wrapper">
      <h5 className="chart-header">Top Employees</h5>
      <BarChart
        width={400}
        height={300}
        data={getOwners(owners)}
        margin={{ top: 20, bottom: 5, right: 5, left: 5 }}
        fontSize={12}
      >
        <CartesianGrid stroke={COLORS["backgroundGray"]} />
        <XAxis dataKey="name">
          <Text width={12} />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill={COLORS["yellow"]} barSize={20}>
          <LabelList
            dataKey="name"
            position="top"
            fontSize={12}
            marginBottom={15}
          />
        </Bar>
      </BarChart>
    </div>
  );
};

export default TopEmployees;
