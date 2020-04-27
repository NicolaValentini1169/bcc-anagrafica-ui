import React, { Component } from "react";
import SearchBox from "./SearchBox";
import SearchTable from "./SearchTable";

class SearchingPage extends Component {
  state = {
    customers: null,
  };

  componentDidMount() {
    const { customers } = this.state;
    if (customers) {
      customers.map(
        (customer) => (customer.details = <button>Dettagli</button>)
      );
      this.setState({ customers });
    }

    // da aggiungere chiamata a user page nel bottono
    // sistemare bottone
  }

  setCustomers = (customers) => {
    this.setState({ customers });
  };

  render() {
    const { customers } = this.state;

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
          <SearchBox saveCustomers={this.setCustomers} />
          <SearchTable customers={customers} />
        </div>
      </div>
    );
  }
}

export default SearchingPage;
