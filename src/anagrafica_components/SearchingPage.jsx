import React from "react";
import { Redirect } from "react-router-dom";

import SearchingBox from "./SearchingBox";
import SearchingTable from "./SearchingTable";
import auth from "../services/authService";
import { ROUTES } from "./common/Constants";

function SearchingPage(props) {
  if (!auth.getJwt()) return <Redirect to={"/" + ROUTES.LOGIN} />;

  return (
    <div className="container page-container">
      <SearchingBox />
      <SearchingTable {...props} />
    </div>
  );
}

export default SearchingPage;
