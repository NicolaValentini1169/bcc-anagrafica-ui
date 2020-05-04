import React from "react";

const Input = ({ name, label, ...rest }) => {
  return (
    <div className="form-group">
      <label className="labelForm float-left" for={label}>
        {label}
      </label>
      <input {...rest} name={name} id={name} className="form-control " />
    </div>
  );
};

export default Input;
