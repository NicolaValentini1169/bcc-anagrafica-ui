import React from "react";
import { Redirect } from "react-router-dom";

import auth from "../services/authService";
import { ROUTES } from "./common/Constants";

function ImportingPage(props) {
  if (!auth.getJwt() || !auth.checkAuthorization())
    return <Redirect to={"/" + ROUTES.LOGIN} />;

  return (
    <div className="container page-container">
      <h1>Pagina Importa Clienti</h1>
    </div>
  );
}

export default ImportingPage;
