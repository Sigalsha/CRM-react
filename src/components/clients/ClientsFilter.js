import React, { Component } from "react";
import { clientsHeaders } from "./clientsHeaders";

class ClientsFilter extends Component {
  state = {};
  render() {
    const { clients } = this.props;
    // console.log(clients);
    return (
      <div>
        {clientsHeaders.map((clientFilter) => {
          return <div />;
          // clientFilter && <DropdownList clientFilter={filterName} />;
        })}
      </div>
    );
  }
}

/* const DropdownList = ({ filterName }) => {
  filterName && (
    <div className="filter-options">
      <label for={filterName.name}>{filterName.name}</label>
      <select name={filterName} value={filterName} id={filterName.id}>
        <option value={}>{}</option>
      </select>
    </div>
  );
}; */

/* clientsHeaders.parse
                    map((header) => 
                    <div className="column-header" key={header}>{header}</div>)} */

export default ClientsFilter;
