import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { NAV_LINKS } from "../../utils/consts";
import "../../styles/general/navbar.css";

class Navbar extends Component {
  isLinkActive = (linkPath, pathname) => {
    return `${pathname === linkPath ? "nav-link nav-link-active" : "nav-link"}`;
  };

  render() {
    const {
      location: { pathname }
    } = this.props;

    return (
      <div id="navbar-container">
        <Link to="/" className={this.isLinkActive("/", pathname)}>
          {NAV_LINKS["home"]}
        </Link>
        <Link to="/clients" className={this.isLinkActive("/clients", pathname)}>
          {NAV_LINKS["clients"]}
        </Link>
        <Link to="/actions" className={this.isLinkActive("/actions", pathname)}>
          {NAV_LINKS["actions"]}
        </Link>
        <Link
          to="/analytics"
          className={this.isLinkActive("/analytics", pathname)}
        >
          {NAV_LINKS["analytics"]}
        </Link>
        <Link to="/logout" className={this.isLinkActive("/logout", pathname)}>
          {NAV_LINKS["logout"]}
        </Link>
      </div>
    );
  }
}

export default withRouter(Navbar);
