import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../pages/login/Login";
import Time from "../components/time/Time";
import SignUp from "../pages/signup/SignUp";
import Header from "../components/header/Header";
import { checkAuth } from "../redux/actions";
class Router extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {this.props.isLogin ? (
          <React.Fragment>
            <Redirect from="/" to="/timer" />
            <Header />
            <Route path="/timer" component={Time} />
          </React.Fragment>
        ) : (
          <Redirect from="/" exact to="/login" />
        )}
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.token ? true : false,
  };
};
export default connect(mapStateToProps, {
  checkAuth,
})(Router);
