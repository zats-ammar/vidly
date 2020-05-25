import http from "./httpService";
import { apiUrl } from "./../config/config.json";

const apiEndPoint = apiUrl + "movies";
export function getMovies() {
  return http.get(apiEndPoint);
}

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  //update
  if (movie._id) {
    //removing the id from body of the request as our restful api doesn't like ids in body
    //since it's confusing as we submit an id in url as well as in body
    const body = { ...movie }; //clone the posting object as it's not good to directly update movie obj as its a part of our state
    delete body._id; //remove id from body
    return http.put(movieUrl(movie._id), body);
  }

  //create
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieID) {
  return http.delete(movieUrl(movieID));
}
