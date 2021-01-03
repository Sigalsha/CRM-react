import React, { Component } from "react";
import { emailTypes, isSold } from "../../utils/consts";
import Select from "../general/Select";
import utils from "../../utils/utils";
import { clientsHeaders } from "../../utils/consts";
import "../../styles/clients/clientsFilter.css";

class ClientsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: utils.reduceDuplications(
        utils.getClientProperty(clientsHeaders["owner"], this.props.clients)
      ),
      names: utils.getClientProperty(
        clientsHeaders["name"],
        this.props.clients
      ),
      countries: utils.reduceDuplications(
        utils.getClientProperty(clientsHeaders["country"], this.props.clients)
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
          optionList={emailTypes}
          onChange={this.handleChange}
          value={emailType}
          name="emailType"
        />
        <Filter
          labelName="Sold"
          placeholder="Sold"
          optionList={isSold}
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
      />
    </div>
  );
};

export default ClientsFilter;
