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
    debugger;
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

  changeOwner = () => {
    const { owner } = this.state;
    const { currentClient, updateClient } = this.props;
    debugger;

    if (!currentClient) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"]["currentClient"],
        alert: true,
      });
      return;
    }

    if (!owner) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"]["owner"],
        alert: true,
      });
      return;
    }

    updateClient({ id: currentClient._id, owner });
  };

  changeEmailType = () => {
    const { emailType } = this.state;
    const { currentClient, updateClient } = this.props;

    debugger;
    if (!currentClient) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"]["currentClient"],
        alert: true,
      });
      return;
    }

    if (!emailType) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"]["emailType"],
        alert: true,
      });
      return;
    }

    updateClient({ id: currentClient._id, emailType });
  };

  declareSold = () => {
    const { currentClient, updateClient } = this.props;
    debugger;
    if (currentClient && currentClient.sold) {
      this.setState({
        alertText: ACTIONS_ALERTS["update"]["declareSale"],
        alert: true,
      });
      return;
    } else {
      if (!currentClient) {
        this.setState({
          alertText: ACTIONS_ALERTS["update"]["currentClient"],
          alert: true,
        });
        return;
      }
      updateClient({ id: currentClient._id, sold: true });
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
        <UpdateHeader text={UPDATE_CLIENT_HEADERS["transferOwnership"]} />
        <Datalist
          list={owners}
          placeholder="Owner"
          id={owners}
          mapList={owners}
          name="owner"
          onChange={this.handleInputChange}
        />
        <UpdateButton
          onClick={this.changeOwner}
          text={UPDATE_CLIENT_BUTTONS["transfer"]}
        />

        <UpdateHeader text={UPDATE_CLIENT_HEADERS["sendEmail"]} />
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
          text={UPDATE_CLIENT_BUTTONS["send"]}
        />

        <UpdateHeader text={UPDATE_CLIENT_HEADERS["declareSale"]} />
        <div className="empty-div" />
        <UpdateButton
          onClick={this.declareSold}
          text={UPDATE_CLIENT_BUTTONS["declare"]}
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
