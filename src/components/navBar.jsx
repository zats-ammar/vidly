import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            <NavLink className="nav-link nav-item" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-link nav-item" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link nav-item" to="/rentals">
              Rentals
            </NavLink>
            {!user && 
            <React.Fragment>
            <NavLink className="nav-link nav-item" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link nav-item" to="/register">
              Register
            </NavLink>
            </React.Fragment>
            }
            {user && 
            <React.Fragment>
            <NavLink className="nav-link nav-item" to="/profile">
              {user.name}
            </NavLink>
            <NavLink className="nav-link nav-item" to="/logout">
              Logout
            </NavLink>
            </React.Fragment>
            }
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
