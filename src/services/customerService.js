import http from "./httpService";
import config from "../config.json";

export function getCustomer(params) {
  return http.get(config.apiClienteEndpoint, setParams(params));
}

function setParams(params) {
  // change the Date format from js to java Date format
  if (params.birthDate) {
    const birthDateOnJsFormat = new Date(params.birthDate);
    const birthDateOnJavaFormat = birthDateOnJsFormat.toUTCString();
    params.birthDate = birthDateOnJavaFormat;
  } else delete params.birthDate;

  if (params.customerName === "") delete params.customerName;

  // set branch from string to number
  params.branch = parseInt(params.branch);

  return { params };
}
