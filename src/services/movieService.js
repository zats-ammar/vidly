import http from "./httpService";

const apiEndPoint = "movies";
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
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieID) {
  return http.delete(movieUrl(movieID));
}
