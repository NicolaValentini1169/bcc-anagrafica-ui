import React, { Component } from "react";

class GridCard extends Component {
  getData = (data) => {
    if (data instanceof Object) return data.nome.toString();
    else return data.toString();
  };

  render() {
    const { title, labels, data } = this.props;
    const keys = Object.keys(labels);

    const style = {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      width: "60%",
      "border-bottom": "2px #b3ce27 solid",
      "border-top": "2px #b3ce27 solid",
      "border-left": "0px",
      "border-right": "0px",
      "margin-top": "1%",
      "margin-bottom": "1%",
    };

    return (
      <div className="card customer-card-container" style={style}>
        <div
          className="card-header font-weight-bold"
          style={{ "border-bottom": "2px #b3ce27 solid", width: "100%" }}
        >
          {title}
        </div>
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
