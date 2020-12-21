import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import "../../styles/clients/search.css";

class Search extends Component {
  constructor() {
    super();
  }
  /* 
  handleSearch = (e) => {
    this.props;
    /*   const { searchClients } = this.props;
    const { search } = this.state;
    this.setState({ search: e.target.value.toLowerCase() });

    console.log(search); */

  // this.setState({ search: "" })
  // };

  render() {
    return (
      <div id="search-container">
        <input
          type="text"
          className="search-input"
          value={this.props.searchInput}
          onChange={this.props.searchClients}
          placeholder="search..."
        />
      </div>
    );
  }
}

export default Search;
