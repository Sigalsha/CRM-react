import React, { Component } from "react";
import "../../styles/actions/updateClient.css";

class UpdateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: this.props.owners,
      emailType: this.props.emailType,
      newOwner: "",
      newEmailType: "",
      sold: false,
    };
  }

  handleOwnerChange = (event) => {
    this.setState({
      newOwner: event.target.value,
    });
  };

  handleEmailTypeChange = (event) => {
    this.setState({
      newEmailType: event.target.value,
    });
  };

  changeOwner = () => {
    this.props.updateClient(this.state.newOwner);
  };

  changeEmailType = () => {
    this.props.updateClient(this.state.newEmailType);
  };

  declareSold = () => {
    if (this.state.sold) {
      alert("Sale was already declared!");
    } else {
      this.setState(
        {
          sold: true,
        },
        () => this.props.updateClient(this.state.sold)
      );
    }
  };

  render() {
    const { owners, emailType } = this.state;

    return (
      <div className="update-client-container">
        <UpdateHeader text={"Transfer ownership to:"} />
        <Select
          list={owners}
          placeholder="Owner"
          onChange={this.handleOwnerChange}
          id={owners}
          mapList={owners}
        />
        <UpdateButton onClick={this.changeOwner} text={"transfer"} />

        <UpdateHeader text={"Send email:"} />
        <Select
          list={emailType}
          placeholder={emailType}
          onChange={this.handleEmailTypeChange}
          id={emailType}
          mapList={emailType}
        />
        <UpdateButton onClick={this.changeEmailType} text={"send"} />

        <UpdateHeader text={"Declare sale!"} />
        <div className="empty-div" />
        <UpdateButton
          onClick={this.declareSold}
          text={"declare"}
          id="declareBtn"
        />
      </div>
    );
  }
}

const UpdateHeader = ({ text }) => {
  return <div className="update-header">{text}</div>;
};

const Select = ({ list, placeholder, onChange, id, mapList }) => {
  return (
    <div className="select">
      <input
        className="input-text"
        type="text"
        list={list}
        placeholder={placeholder}
        onChange={onChange}
      />
      <datalist id={id}>
        {mapList.map((item) => (
          <option value={item} key={item} />
        ))}
      </datalist>
    </div>
  );
};

const UpdateButton = ({ onClick, text }) => {
  return (
    <div className="light-btn" onClick={onClick}>
      {text}
    </div>
  );
};

export default UpdateClient;
