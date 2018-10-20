import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../styles/actions/clientInput.css'

class ClientInput extends Component {

    handleChange = (event) => {
        this.props.getCurrentClient(event) //event.target.value = client.name
    }
    
    render() {
        const { clients } = this.props

        return (
            <div id="clientInputContainer">
                <div className="UpdateHeader">Client:</div>
                <input className="inputClientName" type="text" list="clients" placeholder="Client Name" onChange={this.handleChange} />
                <datalist id="clients">
                    {clients.map(client =>
                        <option value={client.name} key={client._id}  />
                    )}
                </datalist>
            </div>
        )
    }
}



export default ClientInput;