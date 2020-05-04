import React from "react";
import Joi from "joi-browser";

import Form from "./common/Form";
import { getBranch } from "../services/branchService";
import { getCustomersByBranchAndNagAndCustomerNameAndBirthDate } from "../services/customerService";
import CustomersContext from "./../context/CustomersContext";
import { LABELS } from "./common/Constants";
import Spinner from "./common/Spinner";

class SearchingBox extends Form {
  static contextType = CustomersContext;

  state = {
    data: { branch: 0, nag: "", customerName: "", birthDate: "" },
    errors: "",
    branchs: [],
    serverResponse: true,
  };

  async componentDidMount() {
    await getBranch()
      .then(({ data: branchs }) =>
        this.setState({ branchs, serverResponse: false })
      )
      .catch(
        (ex) => (
          // eslint-disable-next-line
          console.log("Server error:", ex),
          this.setState({ serverResponse: false })
        )
      );
  }

  schema = {
    branch: Joi.number()
      .required()
      .label("Branch")
      .invalid(0)
      .error(() => {
        return {
          message: LABELS.FILIALE_ERROR,
        };
      }),
    // poi dovra essere messo min(6)
    nag: Joi.string()
      .required()
      .min(1)
      .label("Nag")
      .error(() => {
        return {
          message: LABELS.NAG_ERROR,
        };
      }),
    customerName: Joi.string().allow("").label("Name"),
    birthDate: Joi.date()
      .min("1900-01-01")
      .max(Date.now())
      .allow("")
      .label("birthDate")
      .error(() => {
        return {
          message: LABELS.DATA_DI_NASCITA_ERROR,
        };
      }),
  };

  doSubmit = async () => {
    this.context.handleSearching(true);
    //
    const dataToSend = { ...this.state.data };
    await getCustomersByBranchAndNagAndCustomerNameAndBirthDate(dataToSend)
      .then(({ data: customers }) => this.context.saveCustomers(customers))
      .catch((ex) => console.log("Server error:", ex));

    this.context.handleSearching(false);
  };

  errorDetected(errorMessage) {
    let errors = this.state.errors;
    errors = errorMessage;
    this.setState({ errors });
  }

  render() {
    const { errors, branchs, serverResponse } = this.state;

    if (serverResponse) return <Spinner />;
    else {
      return (
        <div class="card search-card-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-2">
                {this.renderSelect("branch", LABELS.FILIALE_FORM, branchs)}
              </div>
              <div className="col-md-2">
                {this.renderInput("nag", LABELS.NAG_FORM)}
              </div>
              <div className="col-md-2">
                {this.renderInput("customerName", LABELS.NOME_FORM)}
              </div>
              <div className="col-md-3">
                {this.renderInput(
                  "birthDate",
                  LABELS.DATA_DI_NASCITA_FORM,
                  "date"
                )}
              </div>
              <div class="col-md-1">
                <button
                  disabled={this.validate()}
                  className="btn btn-success labelButton align-items-end"
                >
                  {LABELS.CERCA}
                </button>
              </div>
              <div className="col-md-1"></div>
            </div>

            <div className="row">
              <div className="col-md-1"></div>
              <div class="col-md-11">
                <p className="card-text float-left text-sm text-danger">
                  {(errors === "" && LABELS.CAMPI_OBBLIGATORI) || errors}
                </p>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default SearchingBox;
