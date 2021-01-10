import React, { Component } from "react";
// import '.../styles/general/navbar.css';
import {
  BarChart,
  Bar,
  Text,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const data = [
  {
    name: "Janice Alvarado",
    sales: 60,
  },
  {
    name: "Leila Howe",
    sales: 41,
  },
  {
    name: "Emily Durham",
    sales: 38,
  },
  {
    name: "Hull Conrad",
    sales: 25,
  },
  {
    name: "Barton Ramirez",
    sales: 39,
  },
  {
    name: "Martin Massey",
    sales: 60,
  },
  {
    name: "Shepherd Stone",
    sales: 38,
  },
];

class TopEmployees extends Component {
  getOwners = () => {
    const { owners } = this.props;
    const data = [];
    for (const [key, value] of Object.entries(owners)) {
      data.push({ name: key, sales: value });
    }
    console.log(data);
    return data;
  };

  render() {
    const { owners } = this.props;
    console.log("owners: ", owners);
    return (
      <BarChart
        width={400}
        height={400}
        data={this.getOwners()}
        margin={{ top: 40, bottom: 5, right: 5, left: 5 }}
        fontSize={14}
      >
        {/*         <XAxis dataKey="name">
          <Text width="12" />
        </XAxis> */}
        <YAxis
          label={{ value: "num of sales", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" barSize={20}>
          <LabelList dataKey="name" position="top" fontSize={12} />
        </Bar>
      </BarChart>
    );
  }
}

export default TopEmployees;
