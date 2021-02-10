import React, { Component } from "react";
import "../../styles/clients/editClientPopUp.css";

class EditClientPopUp extends Component {
  state = {
    id: this.props.clientToEdit.id,
    firstName: this.props.clientToEdit.name,
    sureName: this.props.clientToEdit.sureName,
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
    let newObject = {};
    const { submitInputChange } = this.props;
    let { id, firstName, sureName, country } = this.state;
    newObject.id = id;
    newObject.name = firstName + " " + sureName;
    newObject.country = country;

    submitInputChange(newObject);
  };

  render() {
    const { id, firstName, sureName, country } = this.state;
    const { toggleEditClient } = this.props;

    console.log("this.props.clientToEdit", this.props.clientToEdit);

    return (
      <div className="popup-wrapper">
        <div className="popup-container" id={id}>
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
