import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import '.../styles/general/navbar.css';
import Select from 'react-select';
import '../../styles/actions/updateClient.css'


class UpdateClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owners: this.props.owners,
            ownerSelectedOption: null,
            ownerOptions: this.props.owners.map(owner => ({ label: owner, value: owner })),
            emailType: this.props.emailType,
            emailTypeOptions: this.props.emailType.map(opt => ({ label: opt, value: opt })),
            emailTypeSelectedOption: null
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChange = (selected) => {
        console.log(selected)
        this.setState({ ownerSelectedOption: selected.value });
    }

    handleTransfer = (ownerSelectedOption) => {
        this.props.changeOwner(ownerSelectedOption)
    }

    render() {
        const { 
            ownerSelectedOption, 
            ownerOptions, 
            emailTypeOptions, 
            emailTypeSelectedOption } = this.state;
        return (
            <div id="updateClientContainer">
                    <UpdateHeader text={"Transfer ownership to:"} />
                    <Select className="select" options={ownerOptions} value={ownerSelectedOption} placeholder={"Owner"} onChange={this.handleChange} />
                    <UpdateButton onClick={this.handleTransfer} text={"transfer"} />
    
                    <UpdateHeader text={"Send email:"} />
                    <Select className="select" options={emailTypeOptions} value={emailTypeSelectedOption} placeholder={"Email Type"} onChange={this.handleChange} />
                    <UpdateButton onClick={this.handleClick} text={"send"} />
    
                    <UpdateHeader text={"Declare sale!"} />
                    <div className="emptyDiv"></div>
                    <UpdateButton onClick={this.handleClick} text={"declare"} id="declareBtn" />
            </div>
        )
    }
}

const UpdateHeader = ({ text }) => {
    return (
        <div className="updateHeader">{text}</div>
    )
}

const UpdateButton = ({ onClick, text }) => {
    return (
        <div className="lightBtn" onClick={onClick}>{text}</div>
    )
}

export default UpdateClient;

