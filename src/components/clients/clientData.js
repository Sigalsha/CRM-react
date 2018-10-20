import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../../styles/clients/clientData.css'
// import ColumnsHeader from './columnsHeader.js'
// import Popup from './popUp.js'

class ClientData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            id: this.props.id,
            firstName: this.props.name.split(" ")[0],
            sureName: this.props.name.split(" ")[1],
            country: this.props.country
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.togglePopup = this.togglePopup.bind(this)

    }

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        let newObject = {};
        let {id,firstName,sureName,country} = this.state;
        newObject.id=id;
        newObject.name=firstName + " " + sureName;
        newObject.country=country;

        this.props.submitInputChange(newObject)
        this.togglePopup()
    }

    render() {
        let name = this.props.name.split(" ")[0]
        let sureName = this.props.name.split(" ")[1]
        let firstContact = this.props.firstContact.split("T")[0]
        return (
            <div>
                {this.state.showPopup ?
                    (<PopUp
                        id={this.state.id}
                        togglePopup={this.togglePopup}
                        firstName={this.state.firstName}
                        sureName={this.state.sureName}
                        country={this.state.country}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                         />)
                    : ("")
                }
                <div className="row-container" id={this.props.id} onClick={this.togglePopup}>
                    <div className="rowItem">{name}</div>
                    <div className="rowItem">{sureName}</div>
                    <div className="rowItem">{this.props.country}</div>
                    <div className="rowItem">{firstContact}</div>
                    <div className="rowItem">{this.props.emailType}</div>
                    <div className="rowItem">
                        {this.props.sold ?
                            (<span><strong>V</strong></span>) :
                            ("-")
                        }
                    </div>
                    <div className="rowItem">{this.props.owner}</div>
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


