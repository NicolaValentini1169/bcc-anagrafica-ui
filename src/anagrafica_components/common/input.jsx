import React from "react";

const Input = ({ name, ...rest }) => {
  return (
    <div className="form-group">
      <input
        {...rest}
        name={name}
        id={name}
        className="labelForm form-control"
      />
    </div>
  );
};

export default Input;
