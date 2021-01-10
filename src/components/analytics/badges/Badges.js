import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/analytics/badges.css";

const Badges = ({ badges }) => {
  return (
    <div className="badges-wrapper">
      {badges.map((badge) => {
        return (
          <div
            className="badge"
            key={badge.id}
            name={badge.name}
            icon={badge.icon}
            header={badge.header}
            description={badge.description}
          >
            <FontAwesomeIcon icon={badge.icon} className="badge-icon" />
            <div className="badge-header">{badge.header}</div>
            <p className="badge-desc">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Badges;
