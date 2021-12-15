import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../utils/consts";
import { clearErrors } from "../../actions/errorActions";
import InputWrapper from "../general/InputWrapper";
import "../../styles/general/landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  handleInputChange = (event) => {
    const {
      target: { value, name }
    } = event;

    this.setState({
      [name]: value
    });
  };

  signIn = () => {
    clearErrors();
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="landing-container">
        <div className="landing-header">
          <span>Sign In</span>
        </div>
        <div className="landing-links-wrapper">
          <div>
            <InputWrapper
              inputVal={name}
              handleInputChange={this.handleInputChange}
              inputTypeString="name:"
            />
            <InputWrapper
              inputVal={email}
              handleInputChange={this.handleInputChange}
              inputTypeString="email:"
            />
            <InputWrapper
              inputVal={name}
              inputType="password"
              handleInputChange={this.handleInputChange}
              inputTypeString="password:"
            />
          </div>
        </div>
      </div>
    );
  }
}

const LinkContainer = ({ path, text }) => {
  return (
    <Link to={path} className="link-square">
      <span className="single-link">{text}</span>
    </Link>
  );
};

export default Landing;
