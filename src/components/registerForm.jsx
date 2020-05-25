import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
//'* as userService' syntax -> import all the exported functions from the path and set to userService object
import * as userService from "../services/userService"; 
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try{
      //convention when defining custom headers->  start with x-....
      //in order to read custom http headers from client, you need to set "access-control-expose-headers" standard http header in backend
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      //this.props.history.push("/"); history.push won't invoke componentDidMount() of our app component
      window.location = '/';
    }
    catch (ex){
      //usually a register endpoint should return 2 type of response
      //200 for success
      //400(bad request) if a user has already registered
      if(ex.response && ex.response.status === 400){
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleFormSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
