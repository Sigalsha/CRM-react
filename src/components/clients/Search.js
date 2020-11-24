import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import "../../styles/clients/search.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
  }

  handleSearch = (e) => {
    const { searchClients } = this.props;
    const { search } = this.state;
    let clientSearched = e.target.value.toLowerCase();
    this.searchClients(clientSearched);
    // this.setState({ search: "" })
  };

  render() {
    return (
      <div id="search-container">
        <input
          type="text"
          className="search-input"
          value={this.state.search}
          onChange={this.handleSearch}
          placeholder="search..."
        />
      </div>
    );
  }
}

export default Search;
