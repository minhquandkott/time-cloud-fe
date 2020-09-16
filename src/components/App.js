import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
import Point from "./point/Point";
function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
