import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";

//apps created with create-react-app has built-in support for environment variables
//process represents current process
//env represents all the environment variables
//any environment variable set in process.env will be replaced with its actual value during build time
//npm start > development env variables will be used during build time
//npm run build > production env variables will be used during build time
//npm test > test env variables will be used during build time
//open up devtools>Sources>Domain>Static>js>Bundle.js and search for SUPERMAN to test this
console.log("SUPERMAN", process.env.REACT_APP_API_URL);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
