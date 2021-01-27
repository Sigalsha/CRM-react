import React, { Component } from "react";
import "../../styles/actions/clientInput.css";

class ClientInput extends Component {
  handleChange = (event) => {
    this.props.getCurrentClient(event); // event.target.value = client.name
  };

  render() {
    const { clients } = this.props;

    return (
      <div className="client-input-container">
        <div className="update-header">Client:</div>
        <input
          className="input-client-name"
          type="text"
          list="clients"
          placeholder="Client Name"
          onChange={this.handleChange}
        />
        <datalist id="clients">
          {clients.map((client) => (
            <option value={client.name} key={client._id} />
          ))}
        </datalist>
      </div>
    );
  }
}

export default ClientInput;
