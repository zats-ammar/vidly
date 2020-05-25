import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//error handling lib
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

//inherits base form
class LoginForm extends Form {
  state = {
    //initialize value for controlled elements
    //name it as data for reusable purpose
    data: { username: "", password: "" }, //undefined/null cannot be used as a value for a controlled element
    errors: {}, //all the errors in this login form
    //using an object fro errors instead of array to easily manipulate properties of
    //e.g errors['username']
    //e.g errors.find(e => e.name === 'username)
  };

  //for Joi. schema doens't have to be a part of state because it isn't changing overtime
  schema = {
    //Joi property name should match state property name to map
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
  };

  //defining a React ref to a DOM element
  //we should always minimize the use of refs in React, only use when you really need it
  //it's ok to use refs to get focus to an element,working with animation,third party DOM libraries
  //for forms there is a better way than refs
  username = React.createRef();

  componentDidMount() {
    //e.g focus to an element using refs
    //this.username.current.focus();
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      //app.js componentDidMount() is invoked once during the lifecycle of our application
      //because our app component is mounted once, and whenever we change it's state, it's re rendered
      //so to get the latest token and set the user data after login, do a full reload which will invoke our app.js componentDidMount()
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        {/* zen coding */}
        {/* form>(div.form-group>label+input.form-control)*2 -> press tab*/}
        <form onSubmit={this.handleFormSubmit}>
          {/* -----------html input field------------- */}
          {/* making them controlled elements rather than using refs */}
          {/* <div className="form-group">
            <label htmlFor="username">UserName</label>
            <input
              //ref={this.username} //react ref(not the better way)
              value={data.username} //making this a controlled element. (passing data via props)
              onChange={this.handleChange} //making this a controlled element. (notifying changes to the data via events)
              name="username" //use name property to identify the current target in change event
              id="username"
              type="text"
              className="form-control"
            />
          </div> */}

          {/* reusable Input Component  */}
          {/* <Input
            name="username"
            label="Username"
            value={data.username}
            onChange={this.handleChange}
            error={errors.username}
          /> */}
          {/* <Input
            name="password"
            label="Password"
            value={data.password}
            onChange={this.handleChange}
            error={errors.password}
          /> */}

          {/* rendering reusable Input component dynamically to minimize code duplication between them */}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {/* rendering button dynamically */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

//----better approach for form elements than using refs----
//in a form, input elements has it's own state for values
//it is totally detached form our component state
//we should get rid of input element state and totally rely on component state to achieve single source of truth
//to achieve that we need to convert these elements to controlled elements
//controlled elements are same as controlled components
//means that they don't have their own state. instead they get all their data via props and they notify changes to the data via events
export default LoginForm;

//in a form that inherits a parent form,you have to think of
//initialize state
//set the schema
//define server call once validation passes
//rendering the form
