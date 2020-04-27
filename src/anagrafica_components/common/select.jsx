import React from "react";

const Select = ({ name, label, options, ...rest }) => {
  return (
    <div className="form-group">
      <select
        id={name}
        name={name}
        {...rest}
        className="labelForm form-control"
      >
        <option selected value="0">
          {label}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
