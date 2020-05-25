import React, { Component } from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  //initialize UNCHANGING properties outside the state object, because it won't change within the lifecycle of this component
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    }, //paths are set to property names to access by tablebody dynamically
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    }, //give a new property that can be used as a unique key to iterate
  ];

  deleteColumn = {
    key: "delete",
    content: (
      movie // instead of setting this to a react element, we change this to a function that accepts a movie object from table and returns a react element
    ) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        type="button"
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super(); //we should call parent class constructor since we have added a custom constructor
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
