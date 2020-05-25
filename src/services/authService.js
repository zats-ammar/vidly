import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "./../config/config.json";

const apiEndPoint = apiUrl + "auth";
const tokenKey = "token";

//--avoiding bi-directional dependencies
//send jwt to set it in httpservice
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });

  //JWT -> it's a json object that is encoded using base64Url algorithm
  //jwt has 3 parts(header / payload / digital signature)
  //1. header contains standard data(ALGORITHM & TOKEN TYPE)
  //2. payload contains basic attributes(claims) of the logged in user(id/name/email/token generated time(iat))
  //so this token is claiming that this user/their id/their name/their email
  //3. digital signature - generated based on the header + payload + a secret(private key) that is only available on the server
  //this prevents a hacker to modify the id to pretend to be someone else
  //because the moment you modify any of this properties, this digital signature needs to be re-generated
  //to generate the digital signature, the secret(private key) needed. and this is only available on server
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    //wrapping with a try/catch to handle when we don't have a valid jwt at localStorage
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

//technically we don't need to export above individual functions because we export below a default object
//but we can keep them as it is because in case we want to import only a single functions in another module
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
