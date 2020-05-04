import http from "./httpService";
import config from "../config.json";

export function setCustomerAsEdited(keys, data, id) {
  return http.post(config.apiVerifyAnagraficaEndpoint, setBody(keys, data, id));
}

function setBody(keys, data, id) {
  let body = {};

  keys.map((key) => (body[key] = data[key] ? true : false));
  delete body.p7;
  body.id = id.toString();

  return body;
}

export function getCustomersByBranchAndNagAndCustomerNameAndBirthDate(params) {
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

export function getCustomerById(id) {
  console.log("1", config.apiClienteEndpoint + "-by-id?id=" + id);
  return http.get(config.apiClienteEndpoint + "-by-id?id=" + id);
}
