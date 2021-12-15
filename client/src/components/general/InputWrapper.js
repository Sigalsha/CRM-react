import React from "react";
import Required from "./Required";
import ActionSubHeader from "../actions/ActionSubHeader";
import Input from "./Input";
import "../../styles/actions/addClient.css";

const InputWrapper = ({
  inputVal,
  inputType,
  inputTypeString,
  handleInputChange
}) => {
  return (
    <div className="input-wrapper">
      <Required />
      <ActionSubHeader text={inputTypeString} />
      <Input
        name={inputTypeString}
        value={inputVal}
        onChange={handleInputChange}
        inputType={inputType}
      />
    </div>
  );
};

export default InputWrapper;
