import http from "./httpService";
import { apiUrl } from "./../config/config.json";

const apiEndPoint = apiUrl + "users";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
