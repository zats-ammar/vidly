//importing objects from 3rd party libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//importing components of our application
import Movies from "./components/movies.jsx";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notfound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout.jsx";
import ProtectedRoute from "./components/common/protectedRoute.jsx";
//importing services of our application
import auth from "./services/authService";
//importing css modules
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            {/* routes are work in an order */}
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {/* protecting a route */}
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            {/* we cannot directly pass additional props to the child component(Movies) which is under Route component as like in Navbar(user={user}) */}
            {/* in order to pass, we need to use the render attribute */}
            {/* it takes a function 'props', and returns movies component */}
            {/* it is essential to add all these props({...props}) to the child component, because it includes history,match,etc that react will automatically inject while routing */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-Found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
