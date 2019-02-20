import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import DropDown from "./dropdown";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleFormSubmit = e => {
    //preventing default behaviour of a form submit to avoid events such as full reload,download the bundle,etc
    //you can test this in network tab
    e.preventDefault();

    const errors = this.validate();
    //we set this returned errors object to state errors object if it's truthy OR we set en empty object to prevent errors
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  //get the property currentTarget of event object and store it in a variable called input
  handleChange = ({ currentTarget: input }) => {
    //handle single input field error while changing the value
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    //use bracket notation instead of dot notation to handle properties of an object dynamically
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    //---best way using Joi----
    //abortearly does exit the validation process as soon as the first validation fails
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options); //pass whole state object & whole schema object to validate the whole form
    console.log(result);
    if (!result.error) return null; //no errors

    //if errors, map them to an object
    const errors = {};
    //iterate over errors received by Joi and assign key(element)/value(errorMessage) to this error object dynamically
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message; //i.e errors.username = "Username is required"
    }
    return errors;

    //----basic way of error handling----
    //initialize to an empty error object before validate
    // const errors = {};
    // const { data } = this.state;
    // if (data.username.trim() === "")
    //   errors.username = "Username is required";
    // if (data.password.trim() === "")
    //   errors.password = "Password is required";
    // //check any properties are set to errors object
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    //---best way using Joi----
    const obj = { [name]: value }; //create an object which holds the current single property to be validated
    const schema = { [name]: this.schema[name] }; //create a single schema object which points to the appropriate single property that is mapped to the current single property
    const result = Joi.validate(obj, schema); //pass single state object & single schema object to validate the single field
    return result.error ? result.error.details[0].message : null;

    //----basic way of error handling----
    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    // }
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      />
    );
  };

  renderButton = label => {
    return (
      // this.validate() returns either null or an object in our code.
      // if it passed a null which is considered as falsy therefore false will be applied
      // if it passed an object which is considered as truthy therefore true will be applied
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderDropDown = (name, label, options) => {
    const { errors, data } = this.state;
    return (
      <DropDown
        name={name}
        value={data[name]}
        label={label}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
