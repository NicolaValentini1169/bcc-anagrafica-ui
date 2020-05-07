import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ROUTES, LABELS } from "./common/Constants";
import auth from "../services/authService";
import PrivateNavLink from "./common/PrivateNavLink";
import logo from "../bcc.jpg";

class Navbar extends Component {
  render() {
    const isAuthoraized = auth.checkAuthorization();

    if (!auth.getJwt()) return null;

    return (
      <div className="container navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand text-capitalize" to="/">
            <img src={logo} width="30" height="30" alt="" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav mr-auto">
              <PrivateNavLink
                label={LABELS.RICERCA_CLIENTE}
                to={
                  window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI
                }
              ></PrivateNavLink>
              <PrivateNavLink
                isAuthoraized={isAuthoraized}
                label={LABELS.IMPORTA_CLIENTI}
                to={
                  window.defConfigurations.url_prefix + ROUTES.IMPORTA_CLIENTI
                }
              ></PrivateNavLink>
            </div>
            <div className="navbar-nav my-2 my-lg-0">
              <Link className="nav-item nav-link navButton text-capitalize">
                {auth.getUsername()}
              </Link>
              <Link
                className="nav-item nav-link navButton float-right"
                onClick={auth.logout}
                to={window.defConfigurations.url_prefix + ROUTES.LOGIN}
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

/*<NavLink
              className="nav-item nav-link navButton"
              to={window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI}
            >
              {LABELS.RICERCA_CLIENTE}
            </NavLink>
            {isAuthoraized && (
              <NavLink
                className="nav-item nav-link navButton"
                to={
                  window.defConfigurations.url_prefix + ROUTES.IMPORTA_CLIENTI
                }
              >
                {LABELS.IMPORTA_CLIENTI}
              </NavLink>
            )}*/

export default Navbar;
