import React, { Component } from "react";
import {
  ACTIONS_ALERTS,
  ACTION_HEADERS,
  ACTIONS_BUTTONS,
} from "../../utils/consts";
import Alert from "../general/Alert";
import Datalist from "./Datalist";
import ActionSubHeader from "./ActionSubHeader";
import "../../styles/actions/updateClient.css";
class UpdateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: this.props.owners,
      emailTypes: this.props.emailTypes,
      owner: "",
      emailType: "",
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

  /*   validateAction = (clientAction, alertType) => {
    if (!clientAction) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"][alertType],
        alert: true,
      });
    }
    return;
  }; */

  resetInputes = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  changeOwner = () => {
    const { owner } = this.state;
    const { currentClient, updateClient } = this.props;

    if (!currentClient) {
      this.setState(
        {
          alertText: ACTIONS_ALERTS["update"]["currentClient"],
          alert: true,
          owner: "",
        },
        this.resetInputes()
      );
      return;
    }

    if (!owner) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"]["owner"],
        alert: true,
      });
      console.log("current client", this.props.currentClient);

      return;
    }

    updateClient({ id: currentClient._id, owner }, this.resetInputes());
  };

  changeEmailType = () => {
    const { emailType } = this.state;
    const { currentClient, updateClient } = this.props;

    if (!currentClient) {
      this.setState(
        { alertText: ACTIONS_ALERTS["update"]["currentClient"], alert: true },
        this.resetInputes()
      );
      return;
    }

    if (!emailType) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"]["emailType"],
        alert: true,
      });
      return;
    }

    updateClient({ id: currentClient._id, emailType }, this.resetInputes());
  };

  declareSold = () => {
    const { currentClient, updateClient } = this.props;

    if (currentClient && currentClient.sold) {
      this.setState(
        { alertText: ACTIONS_ALERTS["update"]["declareSale"], alert: true },
        this.resetInputes()
      );
      return;
    } else {
      if (!currentClient) {
        this.setState(
          { alertText: ACTIONS_ALERTS["update"]["currentClient"], alert: true },
          this.resetInputes()
        );
        return;
      }
      updateClient({ id: currentClient._id, sold: true }, this.resetInputes());
    }
  };

  toggleAlert = () => {
    this.setState({ alert: !alert });
  };

  render() {
    const { owners, emailTypes, alert, alertText } = this.state;

    return (
      <div className="update-client-container">
        {alert && <Alert text={alertText} toggleAlert={this.toggleAlert} />}
        <ActionSubHeader text={ACTION_HEADERS["update"]["transferOwnership"]} />
        <Datalist
          list={owners}
          placeholder="Owner"
          id={owners}
          mapList={owners}
          name="owner"
          onChange={this.handleInputChange}
          onFocuse={this.onFocus}
        />
        <UpdateButton
          onClick={this.changeOwner}
          text={ACTIONS_BUTTONS["update"]["transfer"]}
        />

        <ActionSubHeader text={ACTION_HEADERS["update"]["sendEmail"]} />
        <Datalist
          list={emailTypes}
          placeholder="Email Type"
          id={emailTypes}
          mapList={emailTypes}
          name="emailType"
          onChange={this.handleInputChange}
        />
        <UpdateButton
          onClick={this.changeEmailType}
          text={ACTIONS_BUTTONS["update"]["send"]}
        />

        <ActionSubHeader text={ACTION_HEADERS["update"]["declareSale"]} />
        <div className="empty-div" />
        <UpdateButton
          onClick={this.declareSold}
          text={ACTIONS_BUTTONS["update"]["declare"]}
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
