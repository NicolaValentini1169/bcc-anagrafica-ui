import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import Table from "./common/table";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import CustomersContext from "./../context/customersContext";
import { ROUTES, LABELS } from "./common/Constants";

class SearchTable extends Component {
  static contextType = CustomersContext;

  state = {
    columns: [
      { path: "filiali.nome", label: LABELS.FILIALE_TO_SHOW },
      { path: "nag", label: LABELS.NAG_TO_SHOW },
      { path: "nome", label: LABELS.NOME },
      { path: "dataNascita", label: LABELS.DATA_DI_NASCITA },
      {
        key: "dattaglio",
        content: (customer) => (
          <Link
            className="btn btn-success"
            to={ROUTES.VISUALIZZA_CLIENTE + `/${customer.id}`}
          >
            {LABELS.DETTAGLIO}
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
    const { customers: allCustomers } = this.context;

    if (allCustomers) {
      if (allCustomers.length === 0) {
        return {
          totalCount: 0,
          customers: [],
          message: LABELS.NESSUNA_CORRISPONDENZA,
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
          message:
            LABELS.OPERAZIONE_COMPLETATA +
            ", " +
            allCustomers.length +
            " clienti trovati.",
        };
      }
    } else {
      return {
        totalCount: 0,
        customers: [],
        message: LABELS.NUOVA_RICERCA,
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
