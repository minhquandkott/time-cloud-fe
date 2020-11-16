import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
// import SelectCalendar from "../components/selectCalendar/SelectCalendar";
// import Calendar from "../components/calendar/Calendar";

function App() {
  return (
    <div className="app">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
