import React, { Component } from "react";

class GridCard extends Component {
  getData = (data) => {
    if (data instanceof Object) return data.nome.toString();
    else return data.toString();
  };

  render() {
    const { title, labels, data } = this.props;
    const keys = Object.keys(labels);

    return (
      <div className="card grid-card-container">
        <div className="card-header font-weight-bold">{title}</div>
        <div className="row">
          {keys.map((key) => (
            <React.Fragment key={key}>
              <div className="col text-right">{labels[key]}</div>
              <div className="col text-left">{this.getData(data[key])}</div>
              <div class="w-100"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default GridCard;
