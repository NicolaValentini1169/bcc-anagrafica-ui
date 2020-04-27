import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";

class SearchTable extends Component {
  state = {
    columns: [
      { path: "filiali.nome", label: "Filiale" },
      { path: "nag", label: "Nag" },
      { path: "nome", label: "Nome" },
      { path: "dataNascita", label: "Data di nascita" },
      {
        key: "details",
        content: (customers) => (
          <Link className="btn btn-success" to={`/cliente/${customers.id}`}>
            Dettagli
          </Link>
        ),
      },
    ],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "branch", order: "asc" },
  };

  componentWillReceiveProps() {
    this.setState({
      currentPage: 1,
      sortColumn: { path: "branch", order: "asc" },
    });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { customers: allCustomers } = this.props;

    if (allCustomers) {
      if (allCustomers.length === 0) {
        return {
          totalCount: 0,
          customers: [],
          message: "Clienti non trovato.",
        };
      } else {
        let sorted = _.orderBy(
          allCustomers,
          [sortColumn.path],
          [sortColumn.order]
        );
        const customers = paginate(sorted, currentPage, pageSize);

        return {
          totalCount: allCustomers.length,
          customers,
          message: allCustomers.length + " clienti trovati.",
        };
      }
    } else {
      return {
        totalCount: 0,
        customers: [],
        message: "Cerca dei clienti.",
      };
    }
  };

  render() {
    const { columns, sortColumn, pageSize, currentPage } = this.state;
    const { totalCount, customers, message } = this.getPagedData();

    return (
      <React.Fragment>
        <p className="font-weight-bold">{message}</p>
        <Table
          columns={columns}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          data={customers}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default SearchTable;
