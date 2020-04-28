// import jwtDecode from "jwt-decode";
import http from "./httpService";

const tokenKey = "TOKEN";
const user = "USERNAME";

http.setJwt(getJwt());

// export async function login(email, password) {
//   const { data: jwt } = await http.post(apiEndpoint, { email, password });
//   localStorage.setItem(tokenKey, jwt);
// }

export function setJwt(jwt, user) {
  localStorage.setItem(tokenKey, jwt);
  localStorage.setItem(user, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(user);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  setJwt,
  logout,
  getJwt,
};
