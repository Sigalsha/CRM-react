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
import "../../../styles/analytics/charts/topEmployees.css";

const TopEmployees = ({ owners, getOwners }) => {
  /*   function getOwners() {
    const data = [];
    for (const [key, value] of Object.entries(owners)) {
      data.push({ name: key, sales: value });
    }
    return data;
  } */

  return (
    <div className="top-employees-wrapper">
      <h5 className="chart-header">Top Employees</h5>
      <BarChart
        width={400}
        height={400}
        data={getOwners(owners)}
        margin={{ top: 20, bottom: 5, right: 5, left: 5 }}
        fontSize={12}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name">
          <Text width={12} />
        </XAxis>
        <YAxis
          label={{
            value: "num of sales",
            angle: -90,
            position: "insideLeft",
            fontSize: 12,
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#F7CE3E" barSize={20}>
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
