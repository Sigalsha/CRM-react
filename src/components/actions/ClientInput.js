import React, { Component } from "react";
import { ACTION_HEADERS } from "../../utils/consts";
import Required from "../general/Required";
import ActionSubHeader from "./ActionSubHeader";
import Datalist from "./Datalist";
import "../../styles/actions/clientInput.css";

class ClientInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: this.props.clients,
      currentClient: this.props.currentClient || "",
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    const { currentClient } = this.state;
    if (value !== currentClient) {
      this.setState({ currentClient: value });
      this.props.getCurrentClient(event);
    }
  };

  render() {
    const { clients, currentClient } = this.state;

    console.log("current client from client input", currentClient);

    return (
      <div className="client-input-container">
        <Required isClient="true" />
        <ActionSubHeader text={ACTION_HEADERS["update"]["client"]} />
        <Datalist
          list={clients}
          placeholder="Client Name"
          onChange={this.handleChange}
          id={clients}
          mapList={clients}
          name="clientName"
        />
      </div>
    );
  }
}

export default ClientInput;

/* const ClientInput = ({ clients, getCurrentClient }) => {
  function handleChange(event) {
    getCurrentClient(event);
  }

  return (
    <div className="client-input-container">
      <div className="update-header">Client:</div>
      <input
        className="input-client-name"
        type="text"
        list="clients"
        placeholder="Client Name"
        onChange={handleChange}
      />
      <datalist id="clients">
        {clients.map((client) => (
          <option value={client.name} key={client._id} />
        ))}
      </datalist>
    </div>
  );
}; */

/* export default ClientInput; */
