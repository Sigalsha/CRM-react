import React from "react";
import "../../styles/actions/actionSubHeader.css";

const ActionSubHeader = ({ headerType, text }) => {
  return (
    <div
      className={
        headerType === "update" ? "update-header" : "add-client-header"
      }
    >
      {text}
    </div>
  );
};

export default ActionSubHeader;
