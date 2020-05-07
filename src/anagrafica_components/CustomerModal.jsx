import React, { Component } from "react";
import CustomersContext from "../context/CustomersContext";
import { LABELS, REPORT_LABELS } from "./common/Constants";
import ViewGridCard from "./common/ViewGridCard";
import FormGridCard from "./FormGridCard";
import PersonalModal from "./common/Modal";
import {
  setCustomerAsEdited,
  getCustomerById,
} from "../services/customerService";
import _ from "lodash";
import Spinner from "./common/Spinner";

class CustomerModal extends Component {
  static contextType = CustomersContext;

  state = {
    unmodifiableDataLabels: {
      nome: LABELS.NOME,
      nag: LABELS.NAG_TO_SHOW,
      dataNascita: LABELS.DATA_DI_NASCITA,
    },
    modifiableDataLabels: {
      email: LABELS.EMAIL,
      telefono: LABELS.NUMERO_TELEFONO,
      firma: LABELS.FIRMA_GRAFOMETRICA,
      p1: REPORT_LABELS.P1,
      p2: REPORT_LABELS.P2,
      p3: REPORT_LABELS.P3,
      p4: REPORT_LABELS.P4,
      p5: REPORT_LABELS.P5,
      p6: REPORT_LABELS.P6,
      p7: REPORT_LABELS.P7,
    },
    messageModalAlreadyConfirmed: (customer) => {
      return (
        <p className="text-center">
          {LABELS.ANAGRAFICA_CLIENTE_TEXT}
          <br />
          {LABELS.DATA_INSERITA} {customer.lastModify}.
          <br />
          {LABELS.CODICE_ASSEGNATO} {customer.codice}.
        </p>
      );
    },
    messageModalJustConfirmed: (customer) => {
      return (
        <p className="text-center">
          {LABELS.CODICE_ASSEGNATO} {customer.codice}.
        </p>
      );
    },
    customer: null,
    show: true,
    customerWillUpdated: false,
    customerIsUpdated: false,
    data: {},
  };

  componentWillReceiveProps(props) {
    if (this.props.id) {
      const customers = this.context.customers;
      const { id } = this.props;
      let customer = null;

      customers.map((c) => (c.id === id ? (customer = c) : null));
      this.setState({ customer, show: props.show });
    }
  }

  handleSubmit = async (e) => {
    const { data, modifiableDataLabels, customer } = this.state;

    if (e.target.name === "btn-confirm") {
      const dataToSend = data;
      const keys = Object.keys(modifiableDataLabels);
      const id = customer.id;

      await setCustomerAsEdited(keys, dataToSend, id)
        .then(() => {
          this.setState({ customerWillUpdated: true });
          this.updateStateCustomer(id);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else this.handleClose();

    this.setState({ data: {} });
  };

  updateStateCustomer = async (id) => {
    await getCustomerById(id)
      .then((response) => {
        this.setState({
          customer: response.data,
          customerIsUpdated: true,
          customerWillUpdated: false,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  handleClose = () => {
    if (this.state.customerIsUpdated) this.updateContextCustomers();

    this.setState({
      show: false,
      data: {},
      customerIsUpdated: false,
      customerWillUpdated: false,
    });

    this.props.setModalData();
  };

  updateContextCustomers = () => {
    const { customer } = this.state;
    let customers = [...this.context.customers];

    customers = _.remove(customers, function (c) {
      return c.id !== customer.id;
    });
    customers = [customer, ...customers];

    this.context.saveCustomers(customers);
  };

  render() {
    const {
      unmodifiableDataLabels,
      modifiableDataLabels,
      show,
      customerWillUpdated,
      customerIsUpdated,
      messageModalAlreadyConfirmed,
      customer,
      messageModalJustConfirmed,
      data,
    } = this.state;

    if (!customer) return null;

    let header = null;
    let body = null;
    let footer = null;

    if (customer.confermato && (customerIsUpdated || customerWillUpdated)) {
      // setta i dati del modal per il cliente che ha appena confermato
      header = LABELS.OPERAZIONE_COMPLETATA;
      body = customerWillUpdated ? (
        <Spinner />
      ) : (
        messageModalJustConfirmed(customer)
      );
      footer = {
        firstButtonFunction: this.handleClose,
        firstButtonLabel: LABELS.TORNA_ALLA_LISTA,
        secondButtonFunction: this.handleClose,
        secondButtonLabel: LABELS.SCARICA,
      };
    } else if (customer.confermato && !customerIsUpdated) {
      // setta i dati del modal per i clienti gia confemrati
      header = LABELS.ATTENZIONE;
      body = messageModalAlreadyConfirmed(customer);
      footer = {
        firstButtonFunction: this.handleClose,
        firstButtonLabel: LABELS.TORNA_ALLA_LISTA,
        secondButtonFunction: this.handleClose,
        secondButtonLabel: LABELS.SCARICA,
      };
    } else {
      // setta i dati del modal per il cliente che deve ancora confermare
      header = LABELS.DETTAGLIO;
      body = (
        <React.Fragment>
          <ViewGridCard
            title={LABELS.CLIENTE}
            labels={unmodifiableDataLabels}
            customer={customer}
          />
          <FormGridCard
            title={LABELS.CAMPI_MODIFICABILI}
            labels={modifiableDataLabels}
            customer={customer}
            data={data}
            setData={(data) => this.setState({ data })}
          />
        </React.Fragment>
      );
      footer = {
        firstButtonFunction: this.handleSubmit,
        firstButtonLabel: LABELS.ANNULLA,
        secondButtonFunction: this.handleSubmit,
        secondButtonLabel: LABELS.CONFERMA,
      };
    }

    return (
      <React.Fragment>
        <PersonalModal
          id="modalCustomerCode"
          show={show}
          onHide={this.handleClose}
          title={header}
          body={body}
          footer={footer}
        />
      </React.Fragment>
    );
  }
}

export default CustomerModal;
