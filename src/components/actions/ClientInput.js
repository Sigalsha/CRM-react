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
        <div className="client-input-header">
          <Required isClient="true" />
          <ActionSubHeader text={ACTION_HEADERS["update"]["client"]} />
        </div>
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
