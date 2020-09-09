import React from "react";
import "./App.css";
import Header from "./header/Header";
import Time from "./time/Time";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Time /> */}
      <Login />
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
