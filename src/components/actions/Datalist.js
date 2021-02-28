import React from "react";
import "../../styles/actions/datalist.css";

const Datalist = ({ list, placeholder, name, onChange, id, mapList }) => {
  return (
    <div className="datalist-wrapper">
      <input
        className="input-text"
        type="text"
        list={list}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      <datalist id={id}>
        {mapList.map((item, i) => (
          <option
            value={item && item.name ? item.name : item}
            key={item && item._id ? item._id : i}
          />
        ))}
      </datalist>
    </div>
  );
};

export default Datalist;
