import React, { Component } from "react";
import {
  UPDATE_CLIENT_HEADERS,
  UPDATE_CLIENT_BUTTONS,
  ACTIONS_ALERTS,
} from "../../utils/consts";
import Alert from "../general/Alert";
import Datalist from "./Datalist";
import UpdateHeader from "./UpdateHeader";
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
      alert: false,
      alertText: "",
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
    const { newOwner } = this.state;
    const { currentClient, updateClient } = this.props;
    debugger;
    if (!currentClient) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"].client,
        alert: true,
      });
    }
    if (!newOwner) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"].owner,
        alert: true,
      });
    }

    if (currentClient && newOwner) {
      updateClient(newOwner);
    }
  };

  changeEmailType = () => {
    const { newEmailType } = this.state;
    const { currentClient, updateClient } = this.props;

    if (!currentClient) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"].client,
        alert: true,
      });
    }

    if (!newEmailType) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"].emailType,
        alert: true,
      });
    }

    updateClient(newEmailType);
  };

  declareSold = () => {
    if (this.state.sold) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"].declareSale,
        alert: true,
      });
    } else {
      this.setState(
        {
          sold: true,
        },
        () => this.props.updateClient(this.state.sold)
      );
    }
  };

  toggleAlert = () => {
    this.setState({ alert: !alert });
  };

  render() {
    const { owners, emailType, alert, alertText, newOwner } = this.state;
    console.log("newOwner", newOwner);

    return (
      <div className="update-client-container">
        {alert && <Alert text={alertText} toggleAlert={this.toggleAlert} />}
        <UpdateHeader text={UPDATE_CLIENT_HEADERS["transferOwnership"]} />
        <Datalist
          list={owners}
          placeholder="Owner"
          onChange={this.handleOwnerChange}
          id={owners}
          mapList={owners}
        />
        <UpdateButton
          onClick={this.changeOwner}
          text={UPDATE_CLIENT_BUTTONS["transfer"]}
        />

        <UpdateHeader text={UPDATE_CLIENT_HEADERS["sendEmail"]} />
        <Datalist
          list={emailType}
          placeholder={emailType}
          onChange={this.handleEmailTypeChange}
          id={emailType}
          mapList={emailType}
        />
        <UpdateButton
          onClick={this.changeEmailType}
          text={UPDATE_CLIENT_BUTTONS["send"]}
        />

        <UpdateHeader text={UPDATE_CLIENT_HEADERS["declareSale"]} />
        <div className="empty-div" />
        <UpdateButton
          onClick={this.declareSold}
          text={UPDATE_CLIENT_BUTTONS["declare"]}
          id="declareBtn"
        />
      </div>
    );
  }
}

const UpdateButton = ({ onClick, text }) => {
  return (
    <div className="light-btn" onClick={onClick}>
      {text}
    </div>
  );
};

export default UpdateClient;
