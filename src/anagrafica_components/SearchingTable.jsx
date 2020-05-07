import React, { Component } from "react";
import _ from "lodash";

import Table from "./common/Table";
import { paginate } from "../utils/paginate";
import Pagination from "./common/Pagination";
import CustomersContext from "../context/CustomersContext";
import { LABELS } from "./common/Constants";
import CustomerModal from "./CustomerModal";
import Spinner from "./common/Spinner";

class SearchingTable extends Component {
  static contextType = CustomersContext;

  state = {
    columns: [
      { path: "filiali.nome", label: LABELS.FILIALE_TO_SHOW },
      { path: "nag", label: LABELS.NAG_TO_SHOW },
      { path: "nome", label: LABELS.NOME },
      { path: "dataNascita", label: LABELS.DATA_DI_NASCITA },
      { path: "confermato", label: LABELS.CONFERMATO },
      {
        key: "dattaglio",
        content: (customer) => (
          <button
            className="btn btn-success"
            onMouseOver={() => this.setModalId(customer.id)}
            onClick={() => this.setModalShow(true)}
          >
            {LABELS.DETTAGLIO}
          </button>
        ),
      },
    ],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "branch", order: "asc" },
    modalData: { id: null, show: false },
  };

  componentWillReceiveProps() {
    this.setState({
      currentPage: 1,
      sortColumn: { path: "branch", order: "asc" },
      modalData: { id: null, show: false },
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

  setModalId = (id) => {
    let modalData = { ...this.state.modalData };
    modalData.id = id;
    this.setState({ modalData });
  };

  setModalShow = (show) => {
    let modalData = { ...this.state.modalData };
    modalData.show = show;
    this.setState({ modalData });
  };

  render() {
    const {
      columns,
      sortColumn,
      pageSize,
      currentPage,
      modalData,
    } = this.state;
    const { totalCount, customers, message } = this.getPagedData();
    console.log("customers in table", customers);

    return (
      <React.Fragment>
        {(this.context.isSearching && <Spinner />) || (
          <p className="font-weight-bold">{message}</p>
        )}
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
        <CustomerModal
          id={modalData.id}
          show={modalData.show}
          setModalData={() => {
            this.setState({ modalData: { id: null, show: false } });
          }}
        />
      </React.Fragment>
    );
  }
}

export default SearchingTable;
