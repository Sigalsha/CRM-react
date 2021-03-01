import React, { Component } from "react";
import { ACTION_HEADERS, ACTIONS_BUTTONS } from "../../utils/consts";
import ActionSubHeader from "./ActionSubHeader";
import "../../styles/actions/addClient.css";

class AddClient extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      sureName: "",
      country: "",
      owner: "",
      emailType: null,
    };
  }

  handleInputChange = (event) => {
    const {
      target: { value, name },
    } = event;

    this.setState({
      [name]: value,
    });
  };

  checkNewClientDetails = (obj) => {
    for (let key in obj) {
      if (obj[key] === "") {
        return false;
      }
    }
    return;
  };

  handleAddClient = () => {
    let newClient = {};
    let { firstName, sureName, country, owner } = this.state;
    newClient.name = firstName + " " + sureName;
    newClient.country = country;
    newClient.owner = owner;
    if (this.checkNewClientDetails(newClient) === false) {
      alert("please add all the client's details!");
    } else {
      this.props.addNewClient(newClient);
      this.setState({
        firstName: "",
        sureName: "",
        country: "",
        owner: "",
        emailType: null,
      });
    }
  };

  render() {
    let { firstName, sureName, country, owner, emailType } = this.state;
    return (
      <div className="add-client-container">
        <ActionSubHeader text={ACTION_HEADERS["add"]["firstName"]} />
        <Input
          name="firstName"
          value={firstName}
          onChange={this.handleInputChange}
        />
        <ActionSubHeader text={ACTION_HEADERS["add"]["surname"]} />
        <Input
          name={"sureName"}
          value={sureName}
          onChange={this.handleInputChange}
        />
        <ActionSubHeader text={ACTION_HEADERS["add"]["country"]} />
        <Input
          name={"country"}
          value={country}
          onChange={this.handleInputChange}
        />
        <ActionSubHeader text={ACTION_HEADERS["add"]["owner"]} />
        <Input name="owner" value={owner} onChange={this.handleInputChange} />
        <ActionSubHeader text={ACTION_HEADERS["add"]["emailType"]} />
        <Input
          name="emailType"
          value={emailType}
          onChange={this.handleInputChange}
        />
        <AddNewClientBtn
          onClick={this.handleAddClient}
          text={ACTIONS_BUTTONS["add"]["addNew"]}
        />
      </div>
    );
  }
}

const Input = ({ name, value, onChange }) => {
  return (
    <input
      className="input-add-client"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

const AddNewClientBtn = ({ onClick, text }) => {
  return (
    <div className="add-new-client-btn" onClick={onClick}>
      {text}
    </div>
  );
};

export default AddClient;
