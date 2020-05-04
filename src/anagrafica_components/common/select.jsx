import React from "react";

const Select = ({ name, label, options, ...rest }) => {
  return (
    <div className="form-group">
      <label className="labelForm float-left" for={label}>
        {label}
      </label>
      <select id={name} name={name} {...rest} className="form-control ">
        <option selected value="0"></option>
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
