import React from "react";
import "./App.css";

import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
import TaskItem from "../components/tasks/taskItem/TaskItem";
import Time from "../components/tasks/taskItem/TaskItem";
import ProjectItem from "../components/projects/projectItem/ProjectItem";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter history={history}>
        <Router />
      </BrowserRouter> */}
      <ProjectItem>
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </ProjectItem>
    </div>
  );
}

export default App;
