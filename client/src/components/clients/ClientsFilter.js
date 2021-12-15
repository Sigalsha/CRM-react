import React, { Component } from "react";
import utils from "../../utils/utils";
import { EMAIL_TYPES, IS_SOLD, CLIENTS_HEADERS } from "../../utils/consts";
import "../../styles/clients/clientsFilter.css";
import Select from "../general/Select";
class ClientsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: utils.reduceDuplications(
        utils.getClientProperty(CLIENTS_HEADERS["owner"], this.props.clients)
      ),
      names: utils.getClientProperty(
        CLIENTS_HEADERS["name"],
        this.props.clients
      ),
      countries: utils.reduceDuplications(
        utils.getClientProperty(CLIENTS_HEADERS["country"], this.props.clients)
      ),
      owner: "",
      sold: "",
      name: "",
      country: "",
      emailType: "",
    };
  }

  handleChange = (event) => {
    this.props.updateSelectedFilter(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      owners,
      names,
      countries,
      owner,
      emailType,
      name,
      country,
      sold,
    } = this.state;

    return (
      <div className="clients-filter-wrapper">
        <Filter
          labelName="Name"
          placeholder="Name"
          optionList={names}
          value={name}
          onChange={this.handleChange}
          name="name"
          isFilterSelect
        />
        <Filter
          labelName="Country"
          placeholder="Country"
          optionList={countries}
          value={country}
          onChange={this.handleChange}
          name="country"
        />
        <Filter
          labelName="Email Type"
          placeholder="Email Type"
          optionList={EMAIL_TYPES}
          onChange={this.handleChange}
          value={emailType}
          name="emailType"
        />
        <Filter
          labelName="Sold"
          placeholder="Sold"
          optionList={IS_SOLD}
          onChange={this.handleChange}
          value={sold}
          name="sold"
        />
        <Filter
          labelName="Owner"
          placeholder="Owner"
          optionList={owners}
          value={owner}
          name="owner"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const Filter = ({
  labelName,
  optionList,
  placeholder,
  onChange,
  value,
  name,
}) => {
  return (
    <div className="filter-group">
      <label>{labelName}: </label>
      <Select
        optionList={optionList}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        defaultValue="All"
      />
    </div>
  );
};

export default ClientsFilter;
