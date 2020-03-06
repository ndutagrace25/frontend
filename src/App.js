import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

import { PrivateRoutes } from "./common";

// SETTING TOKEN AND RETAINING USER AFTER REFRESH

// check for token
if (localStorage.jwtToken) {
  // set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearProfile());
    // Redirect to Login page
    window.location.href = "/login";
  }
}

class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoutes exact path="/dashboard" component={Dashboard} />
            <PrivateRoutes
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
