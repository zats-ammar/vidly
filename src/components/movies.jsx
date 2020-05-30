import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination"; //defeault export no need curly braces
import { paginate } from "../utils/paginate"; // named export need curly braces
import ListGroup from "./common/listGroup";
import { getGenres } from "./../services/genreService"; // current folder ./ , one folder up ../
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBar from "./common/searchBar";

class Movies extends Component {
  //initializing properties
  state = {
    movies: [], // initialize to empty array until data receive
    genres: [],
    itemsPerPage: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchKey: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    //insert 'All genres' to top of the genre array.
    //false , 0 , "" , null , undefined , and NaN are falsy in javascript
    const { data } = await getGenres();
    const genres = [{ name: "All genres", _id: "" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres, selectedGenre: genres[0] }); //selectedGenre is declared and initialized in this method. not in state
  }

  handleDelete = async (movieId) => {
    //optimistic update
    //hold a reference to the original data
    //then we update the ui first, assuming the delete call to the server will be success most of the time
    //if failed we need to revert the ui back to original data

    //pessimistic update
    //we send the http call first, and once delete from server is success then we update the ui
    //in this case there is a slight delay of updating ui since async call

    const originalMovies = this.state.movies; //hold a reference to the original data
    const movies = originalMovies.filter((movie) => movie._id !== movieId);
    this.setState({ movies }); //then we update the ui first

    try {
      await deleteMovie(movieId); //send the http request
    } catch (ex) {
      //catch http request failures
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted!"); //Expected error displaying

      this.setState({ movies: originalMovies }); //revert the ui back to original data
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; //check this why we doing. we are copying the same object here
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    //searchKey is set to empty string instead of null because,
    //SearchBar is a controlled component
    //when working with controlled elements/components you cannot use null, undefined
    //otherwise react thinks that you're working with an uncontrolled component
    //so the moment user type something in the input field, react thinks that you're trying to convert an uncontrolled component into a controlled component
    this.setState({ selectedGenre: genre, currentPage: 1, searchKey: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchKey: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      itemsPerPage,
      currentPage,
      movies: allMovies,
      sortColumn,
      selectedGenre,
      searchKey,
    } = this.state;
    //first filtering all items
    const filtered =
      selectedGenre && selectedGenre._id //if selectedGenre & id of selectedGenre both truthy, then apply the filter
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : searchKey !== ""
        ? allMovies.filter((m) =>
            m.title.toLowerCase().startsWith(searchKey.toLowerCase())
          )
        : allMovies;

    //second sorting filtered items
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); // [] because we can sortby multiple columns in lodash

    //finally paginating sorted items
    const movies = paginate(sorted, currentPage, itemsPerPage);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      itemsPerPage,
      currentPage,
      genres,
      sortColumn,
      searchKey,
      selectedGenre,
    } = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
            textProperty="name" //passing key/value property names particular to this list, to ListGroup Component to dynamically use these props
            valueProperty="_id" //passing key/value property names particular to this list, to ListGroup Component to dynamically use these props
          />
        </div>
        <div className="col">
          {/* syntax 'user &&' -> if user is truthy, we have this Link component. user permissions */}
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database</p>
          <SearchBar searchKey={searchKey} onChange={this.handleSearch} />
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
