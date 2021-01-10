import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import "../../styles/clients/clientData.css";
// import ColumnsHeader from './columnsHeader.js'
// import Popup from './PopUp.js'

class ClientData extends Component {
  generateClientToEdit = () => {
    const { id, name, country, toggleEditClient } = this.props;
    let clientToEdit = {
      id,
      firstName: name.split(" ")[0],
      sureName: name.split(" ")[1],
      country,
    };
    console.log("clientToEdit - clientData: ", clientToEdit);
    toggleEditClient(clientToEdit);
  };

  render() {
    const { name, emailType, sold, owner, id, country } = this.props;
    let fixedName = name.split(" ")[0];
    let sureName = name.split(" ")[1];
    let firstContact = this.props.firstContact.split("T")[0];

    return (
      <React.Fragment>
        <tr
          className="row-container"
          id={id}
          onClick={this.generateClientToEdit}
        >
          <td className="rowItem">{fixedName}</td>
          <td className="rowItem">{sureName}</td>
          <td className="rowItem">{country}</td>
          <td className="rowItem">{firstContact}</td>
          <td className="rowItem">{emailType}</td>
          <td className="rowItem">
            {sold ? (
              <span>
                <strong>V</strong>
              </span>
            ) : (
              "-"
            )}
          </td>
          <td className="rowItem">{owner}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default ClientData;
