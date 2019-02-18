import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination"; //defeault export no need curly braces
import { paginate } from "../utils/paginate"; // named export need curly braces
import ListGroup from "./common/listGroup";
import { getGenres } from "./../services/fakeGenreService"; // current folder ./ , one folder up ../
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  //initializing properties
  state = {
    movies: [], // initialize to empty array until data receive
    genres: [],
    itemsPerPage: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    //insert 'All genres' to top of the genre array.
    //false , 0 , "" , null , undefined , and NaN are falsy in javascript
    const genres = [{ name: "All genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movieId => {
    this.setState({
      movies: this.state.movies.filter(movie => movie._id !== movieId)
    });
    deleteMovie(movieId);
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; //check this why we doing. we are copying the same object here
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 }); //selectedGenre is declared and initialized in this method. not in state
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      itemsPerPage,
      currentPage,
      movies: allMovies,
      sortColumn,
      selectedGenre
    } = this.state;
    //first filtering all items
    const filtered =
      selectedGenre && selectedGenre._id //if selectedGenre & id of selectedGenre both truthy, then apply the filter
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    //second sorting filtered items
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); // [] because we can sortby multiple columns in lodash

    //finally paginating sorted items
    const movies = paginate(sorted, currentPage, itemsPerPage);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { itemsPerPage, currentPage, genres, sortColumn } = this.state;
    if (count === 0) return <p>There are no movies in database!</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
            textProperty="name" //passing key/value property names particular to this list, to ListGroup Component to dynamically use these props
            valueProperty="_id" //passing key/value property names particular to this list, to ListGroup Component to dynamically use these props
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: "10px" }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            movies={movies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            itemsPerPage={itemsPerPage}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
