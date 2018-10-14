import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../styles/clients/columnsHeader.css'


class ColumnsHeader extends Component {
    render() {
        return (
            <div id="columnsHeader-Container">
                <div className="column-header">Name</div>
                <div className="column-header">SureName</div>
                <div className="column-header">Country</div>
                <div className="column-header">First Contact</div>
                <div className="column-header">Email</div>
                <div className="column-header">Sold</div>
                <div className="column-header">Owner</div>
            </div>
        )
    }
}


export default ColumnsHeader;

