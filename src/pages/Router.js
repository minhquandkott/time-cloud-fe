import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../pages/login/Login";
import Timer from "./timer/Timer";
import SignUp from "./signup/SignUp";
import Header from "../components/header/Header";
import Manage from "./manage/Manage";
import CreateProject from "./createProject/CreateProject";
import Report from "./report/Report";
import Projects from "./../pages/companyProjects/Projects";
import { checkAuth, setRedirectPath, fetchUser } from "../redux/actions";
import ProjectDetail from "./projectDetail/ProjectDetail";
import NotFound from "./notFound/NotFound";

class Router extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    let routes;
    if (this.props.user?.roles?.some((ele) => ele.id === 1 || ele.id === 3)) {
      routes = (
        <Switch>
          <Route path="/" exact component={Timer} />
          <Route path="/timer" component={Timer} />
          <Route path="/report" component={Report} />
          {/* <Route path="/profile" component={<p>profile</p>} />  */}
          <Route path="/manage" component={Manage} />
          <Route path="/createProject" component={CreateProject} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route component={NotFound} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact component={Timer} />
          <Route path="/timer" component={Timer} />
          <Route path="/report" component={Report} />

          {this.props.user?.roles ? <Route component={NotFound} /> : null}
        </Switch>
      );
    }
    return (
      <React.Fragment>
        {this.props.isLogin ? (
          <React.Fragment>
            <Header />
            {routes}
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
  const { token, user, loading } = state.auth;
  return {
    isLogin: token ? true : false,
    user,
    loading,
  };
};
export default connect(mapStateToProps, {
  checkAuth,
  setRedirectPath,
  fetchUser,
})(Router);
