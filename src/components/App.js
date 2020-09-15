import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>

      {/* <Point /> */}
    </div>
  );
}

export default App;
