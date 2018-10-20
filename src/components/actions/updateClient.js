import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../styles/actions/updateClient.css'


class UpdateClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owners: this.props.owners,
            emailType: this.props.emailType,
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
            owners,
            emailType } = this.state;

        return (
            <div id="updateClientContainer">
                <UpdateHeader text={"Transfer ownership to:"} />
                <Select list={"owners"} placeholder={"Owner"} onChange={this.handleChange} id={"owners"} mapList={owners} />
                <UpdateButton onClick={this.handleTransfer} text={"transfer"} />

                <UpdateHeader text={"Send email:"} />
                <Select list={"emailType"} placeholder={"emailType"} onChange={this.handleChange} id={"emailType"} mapList={emailType} />
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

const Select = ({ list, placeholder, onChange, id, mapList}) => {
    return (
        <div className="select">
            <input className="inputText" type="text" list={list} placeholder={placeholder} onChange={onChange} />
            <datalist id={id}>
                {mapList.map((item) =>
                    <option value={item} />
                )}
            </datalist>
        </div>
    )
}

const UpdateButton = ({ onClick, text }) => {
    return (
        <div className="lightBtn" onClick={onClick}>{text}</div>
    )
}

export default UpdateClient;

