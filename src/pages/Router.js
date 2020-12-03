import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import Profile from "./profile/Profile";
import NotFound from "./notFound/NotFound";
import ReportAdmin from "./report/reportadmin/ReportAdmin";
import TimerCalendar from "../components/timerCalendar/TimerCalendar";
import Discussion from '../pages/discussion/Discussion';

class Router extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    const { user, isLogin, managedProjects } = this.props;

    let routes;
    if (user?.roles?.some((ele) => ele.id === 1)) {
      routes = (
        <Switch>
          <Redirect from="/" exact to="/timer" />
          <Route path="/timer" component={Timer} />
          <Route path="/report" exact component={ReportAdmin} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/report/:id" component={Report} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/manage" component={Manage} />
          <Route path="/create_project" component={CreateProject} />
          <Route path="/edit_project/:id" component={CreateProject} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/timer_calendar" component={TimerCalendar} />
          <Route path="/discussion" component={Discussion}></Route>
          <Route component={NotFound} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Redirect from="/" exact to="/timer" />
          <Route path="/timer" component={Timer} />
          <Route path="/report" component={Report} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/discussion" component={Discussion} />
          {managedProjects.length && (
            <>
              <Route
                path="/projects"
                exact
                render={() => (
                  <Projects adminMode={true} managedProjects={managedProjects} />
                )}
              />
              <Route path="/edit_project/:id" component={CreateProject} />
            </>            
          )}
          {managedProjects.length && (
            <Route path="/projects/:id" component={ProjectDetail} />
          )}
          {user?.roles ? <Route component={NotFound} /> : null}
        </Switch>
      );
    }
    return (
      <React.Fragment>
        {isLogin ? (
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
  const { token, user, managedProjects } = state.auth;
  return {
    isLogin: token ? true : false,
    user,
    managedProjects,
  };
};
export default connect(mapStateToProps, {
  checkAuth,
  setRedirectPath,
  fetchUser,
})(Router);
