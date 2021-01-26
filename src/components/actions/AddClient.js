import React, { Component } from "react";
import "../../styles/actions/addClient.css";

class AddClient extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      sureName: "",
      country: "",
      owner: "",
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
      });
    }
  };

  render() {
    let { firstName, sureName, country, owner } = this.state;
    return (
      <div className="add-client-container">
        <InputHeader text={"First Name:"} />
        <Input
          name={"firstName"}
          value={firstName}
          onChange={this.handleInputChange}
        />
        <InputHeader text={"Surname:"} />
        <Input
          name={"sureName"}
          value={sureName}
          onChange={this.handleInputChange}
        />
        <InputHeader text={"Country:"} />
        <Input
          name={"country"}
          value={country}
          onChange={this.handleInputChange}
        />
        <InputHeader text={"Owner:"} />
        <Input name={"owner"} value={owner} onChange={this.handleInputChange} />
        <AddNewClientBtn
          onClick={this.handleAddClient}
          text={"Add New Client"}
        />
      </div>
    );
  }
}

const InputHeader = ({ text }) => {
  return <div className="input-header">{text}</div>;
};

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
