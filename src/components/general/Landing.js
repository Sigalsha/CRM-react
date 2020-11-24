import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/general/landing.css'

class Landing extends Component {



    render() {
        return (
            <div className="Landing">
                <div className="landing-header"><span id="landingHeaderText">CRM - manage your success</span></div>
                <div className="landing-container">
                    <LinkContainer path={"/clients"} text={`Clients`} />
                    <LinkContainer path={"/actions"} text={`Actions`} />
                    <LinkContainer path={"/analytics"} text={`Analytics`} />
                </div>
            </div>
        )
    }
}

const LinkContainer = ({ path, text }) => {
    return (
        <Link to={path} className="link-square">
            <span className="singleLink">{text}</span>
        </Link>
    )
}

export default Landing;