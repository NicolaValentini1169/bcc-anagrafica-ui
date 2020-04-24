import http from "./httpService";
import config from "../config.json";

export function getBranch() {
  return http.get(config.apiFilialiEndpoint);
}
