import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../../styles/clients/popUp.css'

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.name.split(" ")[0],
            surName: this.props.name.split(" ")[1],
            country: this.props.country
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleClosePopup = () => {
        this.props.closePopup()
    }

    render() {
        // let name = this.props.name.split(" ")[0]
        // let sureName = this.props.name.split(" ")[1]
        // let country = this.props.country
        return (
            <div id="popUp-container">
                <div id="popUp-content">
                    <button onClick={this.handleClosePopup}>X</button>
                    <div className="inputName" >Name:</div><input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}></input>
                    <div className="inputSurname">Surname:</div><input type="text" name="surName" value={this.state.sureName} onChange={this.handleInputChange}></input>
                    <div className="">Country</div><input type="text" name="country" value={this.state.country} onChange={this.handleInputChange}></input>
                    <div id="updateBtn">Update</div>
                </div>
            </div>
        )
    }
}


export default PopUp;
