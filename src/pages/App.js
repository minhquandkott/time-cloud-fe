import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
// import Calendar from "../components/calendar/Calendar";

function App() {
  return (
    <div className="app">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>
      {/* <Calendar
        multipleSelect={false}
        value={[new Date()]}
        onSelectDay={(value) => console.log(value)}
      /> */}
    </div>
  );
}

export default App;
