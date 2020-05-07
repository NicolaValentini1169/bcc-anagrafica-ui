import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    const res =
      _.get(item, column.path) === true
        ? "Si"
        : _.get(item, column.path) === false
        ? "No"
        : _.get(item, column.path);

    return res;
  };

  createKey = (item, column) => {
    return item.key + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody className="tableClienti">
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
