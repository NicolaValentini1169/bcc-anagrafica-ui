import React, { useState } from "react";
import SearchBox from "./SearchBox";
import SearchTable from "./SearchTable";

function SearchingPage(props) {
  const [customers, setCustomers] = useState(null);

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
        <SearchBox saveCustomers={(customers) => setCustomers(customers)} />
        <SearchTable customers={customers} />
      </div>
    </div>
  );
}

export default SearchingPage;
