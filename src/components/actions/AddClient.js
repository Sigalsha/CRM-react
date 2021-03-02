import React, { Component } from "react";
import {
  ACTION_HEADERS,
  ACTIONS_BUTTONS,
  ACTIONS_ALERTS,
} from "../../utils/consts";
import Alert from "../general/Alert";
import Required from "../general/Required";
import ActionSubHeader from "./ActionSubHeader";
import "../../styles/actions/addClient.css";

class AddClient extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      surname: "",
      country: "",
      owner: "",
      alert: false,
      alertText: "",
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

  validateAction = (clientAction, alertType) => {
    if (!clientAction) {
      this.setState({
        alertText: ACTIONS_ALERTS["addClient"][alertType],
        alert: true,
      });
      return false;
    }
    return true;
  };

  toggleAlert = () => {
    this.setState({ alert: !alert });
  };

  handleAddClient = () => {
    const { firstName, surname, country, owner } = this.state;
    debugger;

    if (
      !this.validateAction(firstName, "firstName") ||
      !this.validateAction(surname, "surname") ||
      !this.validateAction(country, "country") ||
      !this.validateAction(owner, "owner")
    ) {
      return;
    }

    const newClient = {
      name: `${firstName} ${surname}`,
      country: country,
      owner: owner,
    };

    if (this.checkNewClientDetails(newClient) === false) {
      alert("please add all the client's details!");
    }

    this.props.addNewClient(newClient);
    this.setState({
      firstName: "",
      surname: "",
      country: "",
      owner: "",
    });
  };

  render() {
    let { firstName, surname, country, owner, alert, alertText } = this.state;
    return (
      <div className="add-client-container">
        {alert && <Alert text={alertText} toggleAlert={this.toggleAlert} />}
        <InputWrapper
          inputType={firstName}
          inputTypeString="firstName"
          handleInputChange={this.handleInputChange}
        />
        <InputWrapper
          inputType={surname}
          inputTypeString="surname"
          handleInputChange={this.handleInputChange}
        />
        <InputWrapper
          inputType={country}
          inputTypeString="country"
          handleInputChange={this.handleInputChange}
        />
        <InputWrapper
          inputType={owner}
          inputTypeString="owner"
          handleInputChange={this.handleInputChange}
        />
        <AddNewClientBtn
          onClick={this.handleAddClient}
          text={ACTIONS_BUTTONS["add"]["addNew"]}
        />
      </div>
    );
  }
}

const InputWrapper = ({ inputType, inputTypeString, handleInputChange }) => {
  return (
    <div style={{ display: "inline-flex", width: "100%" }}>
      <Required />
      <ActionSubHeader text={ACTION_HEADERS["add"][inputTypeString]} />
      <Input
        name={inputTypeString}
        value={inputType}
        onChange={handleInputChange}
      />
    </div>
  );
};

const Input = ({ name, value, onChange }) => {
  return (
    <input
      className="input-add-client"
      type="text"
      name={name}
      value={value ? value : ""}
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
