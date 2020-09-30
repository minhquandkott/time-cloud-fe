import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../pages/login/Login";
import Timer from "./timer/Timer";
import SignUp from "./signup/SignUp";
import Header from "../components/header/Header";
import Manage from "./manage/Manage";
import Projects from "./../pages/projects/Projects";
import { checkAuth, setRedirectPath, fetchUser } from "../redux/actions";
import ProjectDetail from "./projectDetail/ProjectDetail";
class Router extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    console.log(this.props.isLogin);
    return (
      <React.Fragment>
        {this.props.isLogin ? (
          <React.Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={Manage} />
              <Route path="/timer" component={Timer} />
              <Route path="/manage" component={Manage} />
              <Route path="/projects" component={Projects} />
              <Route path= "/project" component={ProjectDetail} />
            </Switch>
          </React.Fragment>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            
          </Switch>
        )}
      </React.Fragment>
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
  setRedirectPath,
  fetchUser,
})(Router);
