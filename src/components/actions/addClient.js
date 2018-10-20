import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import '.../styles/general/navbar.css';

class AddClient extends Component {

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleAddClient = () => {
        let newClient = {};
        let { firstName, sureName, country } = this.state;
        newObject.name = firstName + " " + sureName;
        newObject.country = country;


        this.props.addNewClient(newObject)

    }

    render() {
        return (
            <div id="addClient-container">
                <InputHeader text={"First Name:"} /><input className="input-pop-up" type="text" name="firstName" value={firstName} onChange={handleInputChange}></input>
                <InputHeader text={"Surname:"} /><input className="input-pop-up" type="text" name="sureName" value={sureName} onChange={handleInputChange}></input>
                <InputHeader text={"Country:"} /><input className="input-pop-up" type="text" name="country" value={country} onChange={handleInputChange}></input>
                <InputHeader text={"Owner:"} /><input className="input-pop-up" type="text" name="country" value={country} onChange={handleInputChange}></input>
                <div id="updateBtn" onClick={handleAddClient}>Add New Client</div>
            </div>
        )
    }
}

const InputHeader = ({ text }) => {
    return (
        <div className='inputHeader'>{text}</div>
    )
}

const Input = ({ name }) => {
    return (
        <input className="input-pop-up" type="text" name="country" value={country} onChange={handleInputChange} />
    )
}



export default AddClient;