import React, { Component } from "react";
import "../../styles/clients/clientData.css";
class ClientData extends Component {
  generateClientToEdit = () => {
    const {
      id,
      name,
      country,
      owner,
      emailType,
      sold,
      toggleEditClient,
    } = this.props;
    let clientToEdit = {
      id,
      name,
      country,
      owner,
      emailType,
      sold,
    };
    toggleEditClient(clientToEdit);
  };

  render() {
    const {
      name,
      emailType,
      sold,
      owner,
      id,
      country,
      firstContact,
    } = this.props;
    let fixedName = name.split(" ")[0];
    let surname = name.split(" ")[1];
    let formatFirstContact = firstContact.split("T")[0];

    return (
      <React.Fragment>
        <tr
          className="row-container"
          id={id}
          onClick={this.generateClientToEdit}
        >
          <td className="rowItem">{fixedName}</td>
          <td className="rowItem">{surname}</td>
          <td className="rowItem">{country}</td>
          <td className="rowItem">{formatFirstContact}</td>
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
