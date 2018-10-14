import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/general/navbar.css';

class Navbar extends Component {

    render(){
        return (
            <div id="navbar-container">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/clients" className="nav-link">Clients</Link>
                <Link to="/actions" className="nav-link">Actions</Link>
                <Link to="/analytics" className="nav-link">Analytics</Link>
            </div>
        )
    }
}

export default Navbar;