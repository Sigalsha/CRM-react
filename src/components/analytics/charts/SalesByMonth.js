import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
} from "recharts";
import utils from "../../../utils/utils";
import { COLORS, months } from "../../../utils/consts";
import "../../../styles/analytics/analytics.css";
import "../../../styles/analytics/charts/salesByMonth.css";

const SalesByMonth = ({ sales }) => {
  function getSalesByMonth() {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        name: months[i],
        sales: utils.getSalesByMonth(sales, i),
      });
    }
    return data;
  }

  return (
    <div className="chart-wrapper">
      <h5 className="chart-header">2018's Sales by Month</h5>
      <LineChart
        width={400}
        height={300}
        data={getSalesByMonth()}
        margin={{ top: 20, bottom: 5, right: 5, left: 5 }}
        fontSize={12}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
        <Line
          type="monotone"
          dataKey="sales"
          stroke={COLORS["orange"]}
          strokeWidth={2}
          dot={{ fill: COLORS["lightgray"] }}
        />
      </LineChart>
    </div>
  );
};

export default SalesByMonth;
