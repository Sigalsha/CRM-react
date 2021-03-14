import React, { Component } from "react";
import {
  ACTION_HEADERS,
  ACTIONS_BUTTONS,
  ACTIONS_ALERTS,
} from "../../utils/consts";
import Alert from "../general/Alert";
import Required from "../general/Required";
import Datalist from "./Datalist";
import ActionSubHeader from "./ActionSubHeader";
import "../../styles/actions/addClient.css";

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      surname: "",
      country: "",
      owner: "",
      owners: this.props.owners,
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

  resetInputes = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  handleAddClient = () => {
    const { firstName, surname, country, owner } = this.state;

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
    this.setState(
      { firstName: "", surname: "", country: "", owner: "" },
      this.resetInputes
    );
  };

  render() {
    const {
      firstName,
      surname,
      country,
      alert,
      alertText,
      owners,
    } = this.state;

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
          inputTypeString="owner"
          mapList={owners}
          id={owners}
          list={owners}
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

const InputWrapper = ({
  inputType,
  inputTypeString,
  handleInputChange,
  mapList,
  list,
  id,
}) => {
  return (
    <div className="input-wrapper">
      <Required />
      <ActionSubHeader text={ACTION_HEADERS["add"][inputTypeString]} />
      {inputTypeString !== "owner" ? (
        <Input
          name={inputTypeString}
          value={inputType}
          onChange={handleInputChange}
        />
      ) : (
        <Datalist
          isAddClient="true"
          list={list}
          id={id}
          mapList={mapList}
          name={inputTypeString}
          onChange={handleInputChange}
        />
      )}
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
