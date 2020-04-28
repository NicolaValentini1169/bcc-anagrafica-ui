import React, { Component } from "react";
import CustomersContext from "./../context/customersContext";
import { LABELS, REPORT_LABELS } from "./common/Constants";
import GridCard from "./common/GridCard";

class CustomerPage extends Component {
  static contextType = CustomersContext;

  state = {
    customerLabels: {
      dataNascita: LABELS.DATA_DI_NASCITA,
      email: LABELS.EMAIL,
      nag: LABELS.NAG_TO_SHOW,
      nome: LABELS.NOME,
      telefono: LABELS.NUMERO_TELEFONO,
      codice: LABELS.CODICE_UNIVOCO,
      firma: LABELS.FIRMA_GRAFOMETRICA,
    },
    branchLabels: { cab: LABELS.CAB, filiali: LABELS.FILIALE_TO_SHOW },
    privacyLabels: {
      p1: REPORT_LABELS.P1,
      p2: REPORT_LABELS.P2,
      p3: REPORT_LABELS.P3,
      p4: REPORT_LABELS.P4,
      p5: REPORT_LABELS.P5,
      p6: REPORT_LABELS.P6,
      p7: REPORT_LABELS.P7,
    },
  };

  selectedCustomer = () => {
    const customers = this.context.customers;
    const id = parseInt(this.props.match.params.id);

    customers.filter((c) => c.id === id);
    return customers[0];
  };

  render() {
    const { customerLabels, branchLabels, privacyLabels } = this.state;
    const customer = this.selectedCustomer();

    return (
      <div className="backgroundColor">
        <div className="container page-container">
          <h1>Profilo Cliente</h1>
          <GridCard
            title={LABELS.CLIENTE}
            labels={customerLabels}
            data={customer}
          />
          <GridCard title="Filiale" labels={branchLabels} data={customer} />
          <GridCard
            title={LABELS.PRIVACY}
            labels={privacyLabels}
            data={customer}
          />
        </div>
      </div>
    );
  }
}

export default CustomerPage;
