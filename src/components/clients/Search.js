import React from "react";
import "../../styles/clients/search.css";

// TODO - change it to mapList
const Search = ({ searchInput, updateSearchInput }) => {
  return (
    <div id="search-container">
      <input
        type="text"
        className="search-input"
        value={searchInput}
        onChange={updateSearchInput}
        placeholder="search client"
      />
    </div>
  );
};

export default Search;
