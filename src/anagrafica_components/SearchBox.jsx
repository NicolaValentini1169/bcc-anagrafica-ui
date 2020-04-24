import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBranch } from "../services/branchService";
import { getCostumer } from "../services/costumerService";

class SearchBox extends Form {
  state = {
    data: { branch: 0, nag: "", customerName: null, birthDate: null },
    errors: "",
    branchs: [],
  };

  async componentDidMount() {
    const { data: branchs } = await getBranch();
    this.setState({ branchs });

    // sistemare catch
  }

  schema = {
    branch: Joi.number().required().label("Branch"),
    // poi dovra essere messo min(6)
    nag: Joi.string().required().min(2).label("Nag"),
    customerName: Joi.string().label("Name").allow(null),
    birthDate: Joi.date().label("birthDate").allow(null),
  };

  doSubmit = async () => {
    const { data: costumer } = await getCostumer(this.state.data);
    console.log("costumer", costumer);

    // da passare a SearchingPage
    // sistemare catch
  };

  errorDetected(errorMessage) {
    let errors = this.state.errors;
    errors = errorMessage;
    this.setState({ errors });
  }

  render() {
    const { errors, branchs } = this.state;

    return (
      <div class="card card-body">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-3">
              {this.renderSelect("branch", "Select a branch*", branchs)}
            </div>
            <div className="col-md-3">
              {this.renderInput("nag", {
                placeholder: "Nag*",
              })}
            </div>
            <div className="col-md-3">
              {this.renderInput("customerName", {
                placeholder: "Name",
              })}
            </div>
            <div className="col-md-3">
              {this.renderInput("birthDate", {}, "date")}
            </div>
          </div>

          <div className="row">
            <div class="col-md-6">
              <p class="card-text float-left">*Required field.</p>
              {errors !== "" && (
                <p className="card-text text-danger float-left">{errors}</p>
              )}
            </div>
            <div class="col-md-6">
              <button
                disabled={this.validate()}
                className="btn btn-primary float-right"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
