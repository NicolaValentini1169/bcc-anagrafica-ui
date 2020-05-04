import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: "",
  };

  validate = () => {
    const options = { abortEarly: true };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = error.details[0].message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : "";
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || "" });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    let errors = this.state.errors;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors = errorMessage;
    else errors = "";

    input.className = this.setValidation(input.className, errors);
    // non mostra sempre la V verde o la X rossa
    this.setState({ errors });

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };

  setValidation = (classes, errors) => {
    if (errors === "") {
      if (classes.includes("is-invalid"))
        return classes.replace("is-invalid", "is-valid");
      else if (classes.includes("is-valid")) return classes;
      else return (classes += "is-valid");
    } else {
      if (classes.includes("is-valid"))
        return classes.replace("is-valid", "is-invalid");
      else if (classes.includes("is-invalid")) return classes;
      else return (classes += "is-invalid");
    }
  };

  renderSelect(name, label, options, rest) {
    return (
      <Select
        name={name}
        label={label}
        value={this.state.data[name]}
        options={options}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }

  renderInput(name, label, type = "text", rest) {
    return (
      <Input
        label={label}
        type={type}
        name={name}
        value={this.state.data[name]}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
}

export default Form;
