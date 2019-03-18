import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../../styles/clients/clientData.css'
// import ColumnsHeader from './columnsHeader.js'
// import Popup from './popUp.js'

class ClientData extends Component {
    constructor(props) {
        super(props);
        const { id, name, country } = this.props;
        this.state = {
            showPopup: false,
            id,
            firstName: name.split(" ")[0],
            sureName: name.split(" ")[1],
            country
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.togglePopup = this.togglePopup.bind(this);

    }

    togglePopup = () => {
        const { showPopup } = this.state;
        this.setState({
            showPopup: !showPopup
        });
    }

    handleInputChange = (event) => {
        const { target } = event;
        const { value } = target;
        const { name } = target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        let newObject = {};
        const { submitInputChange } = this.props;
        let { id,firstName, sureName, country } = this.state;
        newObject.id = id;
        newObject.name = firstName + " " + sureName;
        newObject.country = country;

        submitInputChange(newObject);
        this.togglePopup();
    }

    render() {
        const { name, emailType, sold, owner } = this.props;
        const { id, firstName, sureName, country, showPopup } = this.state;
        let fixedName = name.split(" ")[0];
        let sureName = name.split(" ")[1];
        let firstContact = this.props.firstContact.split("T")[0]
        return (
            <div>
                {showPopup ?
                    (<PopUp
                        id={id}
                        togglePopup={this.togglePopup}
                        firstName={firstName}
                        sureName={sureName}
                        country={country}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                         />)
                    : ("")
                }
                <div className="row-container" id={id} onClick={this.togglePopup}>
                    <div className="rowItem">{fixedName}</div>
                    <div className="rowItem">{sureName}</div>
                    <div className="rowItem">{country}</div>
                    <div className="rowItem">{firstContact}</div>
                    <div className="rowItem">{emailType}</div>
                    <div className="rowItem">
                        {sold ?
                            (<span><strong>V</strong></span>) :
                            ("-")
                        }
                    </div>
                    <div className="rowItem">{owner}</div>
                </div>
            </div>
        )
    }
}

const PopUp = ({ togglePopup, id, firstName, sureName, country, handleInputChange , handleSubmit}) => {
    return (
        <div id="popUp">
            <div className="popUp-container">
                <div className="popUp-content" id={id}>
                    <div className="exitBtn" onClick={togglePopup}>X</div>
                    <div className="inputHeader" >Name:</div><input className="input-pop-up" type="text" name="firstName" value={firstName} onChange={handleInputChange}></input>
                    <div className="inputHeader">Surname:</div><input className="input-pop-up" type="text" name="sureName" value={sureName} onChange={handleInputChange}></input>
                    <div className="inputHeader">Country</div><input className="input-pop-up" type="text" name="country" value={country} onChange={handleInputChange}></input>
                    <div id="updateBtn" onClick={handleSubmit}>Update</div>
                </div>
            </div>
        </div>
    )
}

export default ClientData;


