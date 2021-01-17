import React from "react";
import "../../styles/general/select.css";

const Select = ({ placeholder, onChange, name, optionList, value }) => {
  return (
    <select
      className="text-row"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      optionlist={optionList}
    >
      <option defaultValue="All">All</option>
      {optionList.map((option, i) => {
        return (
          <option key={i} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
