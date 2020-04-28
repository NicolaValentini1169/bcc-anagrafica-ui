import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBranch } from "../services/branchService";
import { getCustomer } from "../services/customerService";
import CustomersContext from "./../context/customersContext";
import { LABELS } from "./common/Constants";

class SearchBox extends Form {
  static contextType = CustomersContext;

  state = {
    data: { branch: 0, nag: "", customerName: "", birthDate: null },
    errors: "",
    branchs: [],
  };

  async componentDidMount() {
    const { data: branchs } = await getBranch();
    this.setState({ branchs });
  }

  schema = {
    branch: Joi.number().required().label("Branch").invalid(0),
    // poi dovra essere messo min(6)
    nag: Joi.string().required().min(1).label("Nag"),
    customerName: Joi.string().label("Name").allow(""),
    birthDate: Joi.date()
      .min("1900-01-01")
      .max(Date.now())
      .label("birthDate")
      .allow(null),
  };

  doSubmit = async () => {
    try {
      const dataToSend = { ...this.state.data };
      const { data: customers } = await getCustomer(dataToSend);

      this.context.saveCustomers(customers);
    } catch (ex) {
      this.errorDetected(ex.message);
    }
  };

  errorDetected(errorMessage) {
    let errors = this.state.errors;
    errors = errorMessage;
    this.setState({ errors });
  }

  render() {
    const { errors, branchs } = this.state;

    return (
      <div class="card search-card-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-3">
              {this.renderSelect("branch", LABELS.FILIALE, branchs)}
            </div>
            <div className="col-md-3">
              {this.renderInput("nag", {
                placeholder: LABELS.NAG,
              })}
            </div>
            <div className="col-md-3">
              {this.renderInput("customerName", {
                placeholder: LABELS.NOME,
              })}
            </div>
            <div className="col-md-3">
              {this.renderInput("birthDate", {}, "date")}
            </div>
          </div>

          <div className="row">
            <div class="col-md-6">
              <p class="card-text float-left">{LABELS.CAMPI_OBBLIGATORI}</p>
              {errors !== "" && (
                <p className="card-text text-danger float-left">
                  Errore {errors}
                </p>
              )}
            </div>
            <div class="col-md-6">
              <button
                disabled={this.validate()}
                className="btn btn-success float-right"
              >
                {LABELS.CERCA}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
