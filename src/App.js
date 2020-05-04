import React, { Component } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import dotenv from "dotenv";

import { Login } from "./anagrafica_components/Login";
import { USER_TYPE, ROUTES } from "./anagrafica_components/common/Constants";
import config from "./config.json";
import SearchingPage from "./anagrafica_components/SearchingPage";
import ImportingPage from "./anagrafica_components/ImportingPage";
import Navbar from "./anagrafica_components/Navbar";
import auth from "./services/authService";
import CustomersContext from "./context/CustomersContext";
import { dateFormatter } from "./utils/date-formatter";

import "./App.css";

dotenv.config();

class App extends Component {
  state = {
    userType: null,
    username: "",
    customerContextParams: { customers: null, isSearching: false },
  };

  UNSAFE_componentWillMount() {
    //this if handle an eventual modification of URL from the user and redirect it to the login
    /*if (
      this.props.location.pathname === "/" ||
      this.props.location.pathname === "" ||
      this.props.location.pathname === window.defConfigurations.url_prefix
    ) {
      localStorage.removeItem("TOKEN");
      this.props.history.replace(
        window.defConfigurations.url_prefix + ROUTES.LOGIN
      );
    }*/

    for (let api in config) {
      config[api] = config[api].replace(
        "[REACT_APP_URL_JAVA]",
        window.defConfigurations.REACT_APP_URL_JAVA
      );
    }
  }

  handleLogin = async (loginRequest) => {
    let roles = [];

    await auth.login(loginRequest).then((response) => {
      auth.setJwt(response.data.accessToken, response.data.username);
      roles = [...response.data.roles];
      this.setState({
        roles: roles,
        username: response.data.username,
        userType:
          roles.length === 1 && roles[0].authority === USER_TYPE.USER
            ? USER_TYPE.USER
            : USER_TYPE.ADMINISTRATOR,
      });
    });

    this.props.history.replace(
      window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI
    );
  };

  setCustomers = (customers) => {
    console.log("customers", customers);
    customers.map(
      (c) => (
        (c.dataNascita = dateFormatter(c.dataNascita)),
        (c.lastModify = dateFormatter(c.lastModify))
      )
    );
    console.log("customers", customers);

    let customerContextParams = { ...this.state.customerContextParams };
    customerContextParams.customers = customers;
    this.setState({ customerContextParams });
  };

  handleSearching = (value) => {
    let customerContextParams = { ...this.state.customerContextParams };
    customerContextParams.isSearching = value;
    this.setState({ customerContextParams });
  };

  render() {
    const { customers, isSearching } = this.state.customerContextParams;

    return (
      <div className="App">
        <CustomersContext.Provider
          value={{
            customers: customers,
            saveCustomers: this.setCustomers,
            isSearching: isSearching,
            handleSearching: this.handleSearching,
          }}
        >
          <Navbar />
          <Switch>
            <Route
              path={window.defConfigurations.url_prefix + ROUTES.LOGIN}
              exact
              render={(props) => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              path={
                window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI
              }
              exact
              render={(props) => <SearchingPage {...props} />}
            />
            <Route
              path={
                window.defConfigurations.url_prefix + ROUTES.IMPORTA_CLIENTI
              }
              exact
              render={(props) => <ImportingPage {...props} />}
            />
            <Redirect
              to={window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI}
            />
            {/* <Redirect from="/" to={this.state.userType === USER_TYPE.USER && this.state.username !== "" ? window.defConfigurations.url_prefix + "ricerca-clienti" : this.state.username !== "" ? window.defConfigurations.url_prefix + "importa-clienti" : window.defConfigurations.url_prefix + "login"} /> */}
          </Switch>
        </CustomersContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
