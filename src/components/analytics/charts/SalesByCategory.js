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
import { SALES_BY_CATEGORY, COLORS } from "../../../utils/consts";
import "../../../styles/analytics/analytics.css";
import "../../../styles/analytics/charts/salesByCategory.css";

class SalesByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "country",
    };
  }
  handleCategoryChange = (e) => {
    const { value } = e.target;
    this.setState({ category: value });
  };

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
        return COLORS["brown"];
      case "owner":
        return COLORS["yellow"];
      case "emailType":
        return COLORS["orange"];
      case "year":
        return COLORS["lightgray"];
      default:
        return COLORS["lightgray"];
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

    return (
      <div className="chart-wrapper">
        <div className="category-header">
          <h5 className="chart-header">Sales by</h5>
          <select
            className="select-category"
            value={category}
            onChange={this.handleCategoryChange}
          >
            {Object.keys(SALES_BY_CATEGORY).map((c, i) => {
              return (
                <option value={c} key={i} name={c}>
                  {SALES_BY_CATEGORY[c]}
                </option>
              );
            })}
          </select>
        </div>

        <AreaChart
          width={400}
          height={300}
          data={this.generateCategoryData()}
          margin={{ top: 20, bottom: 5, right: 5, left: 5 }}
          fontSize={12}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            strokeWidth={2}
            dot={{ fill: COLORS["lightgray"] }}
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
