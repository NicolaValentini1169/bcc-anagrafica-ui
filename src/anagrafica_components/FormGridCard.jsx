import React, { Component } from "react";
import CustomersContext from "../context/CustomersContext";
import CheckBox from "./common/CheckBox";

class FormGridCard extends Component {
  static contextType = CustomersContext;

  getData = (data) => {
    if (data instanceof Object) return data.nome.toString() || " ";
    if (data === undefined) return " ";
    if (data === null) return " ";
    if (data === true) return "Si";
    if (data === false) return "No";
    else return data.toString() || " ";
  };

  handleChange = (key, value) => {
    const data = { ...this.props.data };
    data[key] = data[key] === value ? null : value;

    this.props.setData(data);
  };

  render() {
    const { title, labels, customer } = this.props;
    const keys = Object.keys(labels);

    return (
      <React.Fragment>
        <div className="card grid-card-container">
          <div className="card-header font-weight-bold">{title}</div>
          <div className="row">
            {keys.map((key) => (
              <React.Fragment key={key}>
                <div className="col text-right">{labels[key]}</div>
                <div className="col text-left">
                  {this.getData(customer[key])}
                </div>
                <div className="col-md-2 text-left">
                  <CheckBox
                    id={key}
                    value={this.getData(customer[key])}
                    onChange={() =>
                      this.handleChange(key, this.getData(customer[key]))
                    }
                  />
                </div>
                <div class="w-100"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FormGridCard;
