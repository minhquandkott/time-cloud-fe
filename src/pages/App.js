import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
import Calendar from "../components/calendar/Calendar";

function App() {
  return (
    <div className="app">
      {/* <BrowserRouter history={history}>
        <Router />
      </BrowserRouter> */}
      <Calendar />
      {/* <span>
        <ChangeTime time={new Date()} />
      </span> */}

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
