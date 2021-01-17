import React, { Component } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text,
} from "recharts";
import Select from "../../general/Select";
import utils from "../../../utils/utils";
import { clientsHeaders } from "../../../utils/consts";
import "../../../styles/analytics/charts/salesByCategory.css";
import { salesByCategory } from "../../../utils/consts";

const data = [{ name: "Romania", sales: 10 }];

class SalesByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      category: "country",
    };
  }
  handleCategoryChange = (e) => {
    const { value } = e.target;
    const { category } = this.state;

    this.setState({ category: value });
  };

  handleEmailType = () => {};

  generateCategoryData = () => {
    const { category } = this.state;
    const {
      getSalesByCategory,
      countries,
      owners,
      emailTypes,
      years,
    } = this.props;

    switch (category) {
      case "country":
        return getSalesByCategory(countries);
      case "owner":
        return getSalesByCategory(owners);
      case "emailType":
        return getSalesByCategory(this._sortEmailTypes(emailTypes));
      case "year":
        return getSalesByCategory(years);
      default:
        return getSalesByCategory(countries);
    }
  };

  generateAreaColor = () => {
    const { category } = this.state;
    switch (category) {
      case "country":
        return "#795548";
      case "owner":
        return "#F7CE3E";
      case "emailType":
        return "#ff884b";
      case "year":
        return "lightgray";
      default:
        return "lightgray";
    }
  };

  _sortEmailTypes = (emailTypes) => {
    return Object.keys(emailTypes)
      .sort()
      .reduce((obj, key) => {
        obj[key] = emailTypes[key];
        return obj;
      }, {});
  };

  render() {
    const { category } = this.state;
    // console.log("years: ", this.props.years);

    return (
      <div className="sales-by-category-wrapper">
        <h5 className="chart-header">Sales by</h5>
        <select value={category} onChange={this.handleCategoryChange}>
          {Object.keys(salesByCategory).map((c, i) => {
            return (
              <option value={c} key={i} name={c}>
                {salesByCategory[c]}
              </option>
            );
          })}
        </select>

        <AreaChart
          width={400}
          height={400}
          data={this.generateCategoryData()}
          margin={{ top: 20, bottom: 5, right: 5, left: 5 }}
          fontSize={12}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            strokeWidth={2}
            dot={{ fill: "lightgray" }}
          />
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
          <Area
            type="monotone"
            dataKey="sales"
            stroke={this.generateAreaColor()}
            fill={this.generateAreaColor()}
            fillOpacity={0.8}
          />
        </AreaChart>
      </div>
    );
  }
}

export default SalesByCategory;
