import React from "react";
import "./App.css";

import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Router />
      </BrowserRouter>

      {/* <Counter /> */}
    </div>
  );
}

export default App;
