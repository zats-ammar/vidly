import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      //if we have properties in data object that we do NOT validate with joi, we need to pass option 'allowUnknown: true' in Joi.validate
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0
    },
    errors: {},
    genres: [],
    selectedGenre: ""
  };

  schema = {
    _id: Joi.string(), //id is not set required because there may be create movie too
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
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
    const genres = getGenres();
    this.setState({ genres });

    const { id: movieId } = this.props.match.params;
    if (movieId) {
      const movie = getMovie(movieId);
      if (!movie) {
        this.props.history.replace("/not-found"); //use replace instead of push to use browser back button to navigate
        return; //to stop executing furthur
      }
      this.setState({ data: this.setToViewModel(movie) });
    }
  }

  setToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = () => {
    let movieData = this.state.data;
    saveMovie(movieData);
    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;
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
          {this.renderDropDown("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
