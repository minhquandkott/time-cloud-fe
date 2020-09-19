import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
import ProjectTask from "./projectTask/ProjectTask";
function App() {
  return (
    <div className="app">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>
      {/* <div className="wrapper">
        <p>abc</p>
        <Tooltip backgroundColor="white" direction="top" arrowSize="10" />
      </div> */}
      {/* <ProjectTask projectName="Code Engine" taskName="Design" /> */}
    </div>
  );
}

export default App;
