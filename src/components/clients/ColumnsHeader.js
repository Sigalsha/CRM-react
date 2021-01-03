import React, { Component } from "react";
import "../../styles/clients/columnsHeader.css";
import { clientsHeaders } from "../../utils/consts";

class ColumnsHeader extends Component {
  render() {
    return (
      <div id="columnsHeader-Container">
        {Object.keys(clientsHeaders).map((header, i) => (
          // header[i] === header[i].toUpperCase() ? header[i].toLowerCase() + slice(header, header[i]) : header[i]
          <div className="column-header" key={i}>
            {header}
          </div>
        ))}
      </div>
    );
  }
}

export default ColumnsHeader;
