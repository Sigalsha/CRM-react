import React, { Component } from 'react';
import '../../styles/clients/columnsHeader.css'
import './clientsHeaders.json';

class ColumnsHeader extends Component {

    render() {
        const clientsHeaders = require('./clientsHeaders.json');

        return (
            <div id="columnsHeader-Container">
                {clientsHeaders.map((header) => 
                    <div className="column-header" key={header}>{header}</div>)}
            </div>
        )
    }
}

export default ColumnsHeader;

