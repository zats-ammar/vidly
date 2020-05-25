import http from "./httpService";
//import config from "./../config/config.json"; //if we use without brackets w'll have to access as config.apiUrl
import { apiUrl } from "./../config/config.json"; //if we use exact property name within brackets(object destructuring) we can access as apiUrl

export function getGenres() {
  return http.get(apiUrl + "genres");
}
