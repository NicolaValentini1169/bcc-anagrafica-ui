// import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const tokenKey = "TOKEN";
const username = "USERNAME";

http.setJwt(getJwt());

export async function login(loginRequest) {
  return await http.post(config.apiLoginEndpoint, loginRequest);
}

export function setJwt(jwt, user) {
  localStorage.setItem(tokenKey, jwt);
  localStorage.setItem(username, user);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(username);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getUsername() {
  return localStorage.getItem(username);
}

export function checkAuthorization() {
  const jwt = this.getJwt();

  if (jwt) {
    if (this.getUsername() === "admin") {
      return true;
    }
  }
  return false;
}

export default {
  login,
  setJwt,
  logout,
  getJwt,
  getUsername,
  checkAuthorization,
};
