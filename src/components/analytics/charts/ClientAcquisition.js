import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import utils from "../../../utils/utils";
import { COLORS } from "../../../utils/consts";
import "../../../styles/analytics/analytics.css";
import "../../../styles/analytics/charts/clientAcquisition.css";

const colors = [COLORS["brown"], COLORS["yellow"], COLORS["orange"]];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ClientAcquisition = ({ sales, salesOf2018, years }) => {
  function getLast6MonthsOf2018() {
    let lastHalfYear = 0;
    for (let i = 5; i < 12; i++) {
      lastHalfYear += utils.getSalesByMonth(salesOf2018, i);
    }
    return lastHalfYear;
  }

  function before2018() {
    return sales.filter((s) => utils.isFrom2018(s.firstContact, true));
  }

  function getSalesData() {
    const data = [
      {
        name: "last month of 2018",
        value: utils.getSalesByMonth(salesOf2018, 11),
      },
      { name: "last 6 months of 2018", value: getLast6MonthsOf2018() },
      { name: "before 2018", value: before2018().length },
    ];

    return data;
  }

  function getSalesDataByYears() {
    const data = [];
    for (const [key, value] of Object.entries(years)) {
      data.push({ name: key, value: value });
    }
    return data;
  }

  return (
    <div className="chart-wrapper">
      <h5 className="chart-header">Client Acquisition</h5>
      <PieChart width={400} height={300} fontSize={13}>
        <Pie
          data={getSalesDataByYears()}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          dataKey="value"
        >
          {getSalesDataByYears().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Pie
          data={getSalesData()}
          cx="50%"
          cy="50%"
          /*  labelLine={false} */
          dataKey="value"
          innerRadius={70}
          outerRadius={90}
          label
        >
          {getSalesData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default ClientAcquisition;
