import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
import Skeleton from "./loading/skeleton/Skeleton";
function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>
      {/* <Skeleton /> */}
    </div>
  );
}

export default App;
