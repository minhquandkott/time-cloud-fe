import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";

function App() {
  return (
    <div className="app">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>
      {/* <div
        style={{
          width: "80rem",
          height: "70rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "cyan",
        }}
      >
        <Tooltip>Click me</Tooltip>
      </div> */}
    </div>
  );
}

export default App;
