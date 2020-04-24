import React, { Component } from "react";
import SearchBox from "./SearchBox";

class SearchingPage extends Component {
  state = {};

  render() {
    return (
      <div className="backgroundColor">
        <h1>Search Costumer</h1>
        <SearchBox />
      </div>
    );
  }
}

export default SearchingPage;
