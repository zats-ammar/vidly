import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: { name: "", _id: "" },
      numberInStock: 0,
      dailyRentalRate: 0,
      _id: ""
    },
    errors: {},
    genres: [],
    selectedGenre: ""
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.object()
      .keys({
        name: Joi.string()
          .required()
          .label("Genre"),
        _id: Joi.string()
          .required()
          .label("Genre")
      })
      .required(),
    numberInStock: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("No In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(1)
      .max(10)
      .label("Rate")
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "" }, ...getGenres()];
    this.setState({ genres });
    const { id: movieId } = this.props.match.params;
    if (movieId) {
      const movie = getMovie(movieId);
      if (!movie) {
        this.props.history.replace("/not-found"); //use replace instead of push to use browser back button to navigate
        return;
      }
      const selectedGenre = movie.genre._id;
      this.setState({ data: movie, selectedGenre });
    }
  }

  doSubmit = () => {
    let movieData = this.state.data;
    saveMovie(movieData);
    this.props.history.push("/movies");
  };

  handleDropdownChange = event => {
    const selectedGenreId = event.target.value;
    const errors = { ...this.state.errors };
    if (!selectedGenreId) {
      const errorMessage = "Please select a Genre";
      errors["genre"] = errorMessage;
    } else {
      delete errors["genre"];
    }
    const selectedGenreObj = this.state.genres.find(
      genre => genre._id === selectedGenreId
    );
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          genre: selectedGenreObj
        },
        errors: errors,
        selectedGenre: selectedGenreObj._id
      };
    });
  };

  render() {
    const { genres, selectedGenre } = this.state;
    const { match } = this.props;

    let heading = "Movie Form";
    if (match.params.id) {
      heading = "Movie Form - " + match.params.id;
    }
    return (
      <React.Fragment>
        <h1>{heading}</h1>
        <form onSubmit={this.handleFormSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genre", "Genre", genres, selectedGenre)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
