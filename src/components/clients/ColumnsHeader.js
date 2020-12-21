import React, { Component } from "react";
import "../../styles/clients/columnsHeader.css";
import { clientsHeaders } from "./clientsHeaders";

class ColumnsHeader extends Component {
  render() {
    return (
      <div id="columnsHeader-Container">
        {clientsHeaders.map((header) => (
          <div className="column-header" key={header}>
            {header}
          </div>
        ))}
      </div>
    );
  }
}

export default ColumnsHeader;
