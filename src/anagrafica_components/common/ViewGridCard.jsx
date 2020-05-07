import React, { Component } from "react";

class ViewGridCard extends Component {
  getData = (data) => {
    if (data instanceof Object) return data.nome.toString() || "campo vuoto";
    if (data === undefined) return "campo vuoto";
    if (data === null) return "campo vuoto";
    if (data === true) return "Si";
    if (data === false) return "No";
    else return data.toString() || "campo vuoto";
  };

  render() {
    const { title, labels, customer } = this.props;
    const keys = Object.keys(labels);

    return (
      <div className="card grid-card-container">
        <div className="card-header font-weight-bold">{title}</div>
        <div className="row">
          {keys.map((key) => (
            <React.Fragment key={key}>
              <div className="col-md-5 text-right">{labels[key]}</div>
              <div className="col text-left">{this.getData(customer[key])}</div>
              <div class="w-100"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default ViewGridCard;
