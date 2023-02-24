import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/auth/Login";
import ClientDashboard from "./components/dashboard/ClientDashboard";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import UserInformation from "./components/admin/UserInformation";
import { refreshToken } from "./store/action/AuthAction";
import { refreshInterval } from "./config/constants";
import "./custom.css";

class App extends Component {
  componentDidUpdate() {
    const { auth, RefreshToken } = this.props;
    console.error("auth", auth);
    if (auth && auth.user && auth.user.refreshAccessToken && RefreshToken) {
      if (this.refreshTimer) clearInterval(this.refreshTimer);
      this.refreshTimer = setInterval(() => {
        RefreshToken(auth.user.accessToken, auth.user.refreshAccessToken);
      }, refreshInterval);
    }
  }
  componentWillUnmount() {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />
            <Route path="/info" component={ClientDashboard} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/users" component={UserInformation} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    auth: state.auth,
    authLoading: state.auth.authLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    RefreshToken: (token, rToken) => {
      dispatch(refreshToken(token, rToken));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
