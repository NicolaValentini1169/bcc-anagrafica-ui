import React from "react";
import SearchBox from "./SearchBox";
import SearchTable from "./SearchTable";

function SearchingPage(props) {
  return (
    <div className="backgroundColor">
      <div
        className="container"
        style={{
          "justify-content": "flex-start",
          "background-color": "white",
        }}
      >
        <h1>Ricerca Clienti</h1>
        <SearchBox />
        <SearchTable {...props} />
      </div>
    </div>
  );
}

export default SearchingPage;
