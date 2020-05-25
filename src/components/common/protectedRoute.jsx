import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../services/authService";

//extracted any additional attributes using (...rest) that may be passed other than path, component, render
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        // body of the props function
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ //to attribute could be a string or an object
                pathname: "/login", //redirecting path
                //state used to pass any additional data to the redirecting component(login)
                //props.location represents the current location before we redirect the user to login page 
                state: { from: props.location }, 
              }}
            />
          );
        //react expects components to start with a capital letter
        //therefore extracted component attribute from Route and renamed to Component to use in as below
        return Component ? <Component {...props} /> : render(props); //dynamic rendering either a component or a render method
      }}
    />
  );
};

export default ProtectedRoute;
