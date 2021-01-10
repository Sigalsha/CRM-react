import React from "react";
import "../../styles/clients/columnsHeader.css";
import { clientsHeaders } from "../../utils/consts";

const ColumnsHeader = () => {
  return (
    <thead>
      <tr id="columns-header-container">
        {Object.keys(clientsHeaders).map((header, i) => (
          // header[i] === header[i].toUpperCase() ? header[i].toLowerCase() + slice(header, header[i]) : header[i]
          <th className="column-header" key={i}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ColumnsHeader;
