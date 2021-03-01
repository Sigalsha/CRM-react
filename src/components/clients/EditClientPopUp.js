import React, { Component } from "react";
import "../../styles/clients/editClientPopUp.css";
class EditClientPopUp extends Component {
  state = {
    firstName: this.props.clientToEdit.name.split(" ")[0],
    sureName: this.props.clientToEdit.name.split(" ")[1],
    country: this.props.clientToEdit.country,
  };

  handleInputChange = (event) => {
    const {
      target: { value, name },
    } = event;
    this.setState({
      [name]: value,
    });
  };

  handleClosePopup = () => {
    this.props.toggleEditClient();
  };

  handleSubmit = () => {
    const { submitInputChange, clientToEdit } = this.props;
    let { firstName, sureName, country } = this.state;

    const clientToUpdate = {
      name:
        firstName && sureName ? `${firstName} ${sureName}` : clientToEdit.name,
      country: country ? country : clientToEdit.country,
    };

    submitInputChange({ ...clientToEdit, ...clientToUpdate });
  };

  render() {
    const { firstName, sureName, country } = this.state;
    const { toggleEditClient, clientToEdit } = this.props;

    return (
      <div className="popup-wrapper">
        <div className="popup-container" id={clientToEdit.id}>
          <div className="exit-btn" onClick={toggleEditClient}>
            X
          </div>
          <div className="popup-row">
            <span>Name:</span>
            <input
              className="popup-input"
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="popup-row">
            <span>Surename:</span>
            <input
              className="popup-input"
              type="text"
              name="sureName"
              value={sureName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="popup-row">
            <span>Country</span>
            <input
              className="popup-input"
              type="text"
              name="country"
              value={country}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="update-btn" onClick={this.handleSubmit}>
            Update
          </div>
        </div>
      </div>
    );
  }
}

export default EditClientPopUp;
