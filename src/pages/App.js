import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
import CreateProject from "./createProject/CreateProject";
import SelectItem from "../components/selectItem/SelectItem";
import UserInfo from "../components/userInfo/UserInfo";

const arr = ["Tasks", "Team"];
function App() {
  return (
    <div className="app">
      {/* <CreateProject /> */}
      <UserInfo
        primaryInfo="Hiep"
        secondaryInfo="vanhiep99w@gmail.com"
        flag="pm"
      />
      {/* <BrowserRouter history={history}>
        <Router />
      </BrowserRouter> */}
    </div>
  );
}

export default App;
{
  /* <Collapse selectMultiple={false}>
        {arr.map((user) => (
          <div>
            <div>
              <UserInfo user={user} />
              <p className="toggle_item reverse">PMPMPM</p>
            </div>
            <div className="content toggle_item">
              <p>abcbabcb</p>
              <p>abcbabcb</p>
              <p>abcbabcb</p>
            </div>
          </div>
        ))}
      </Collapse> */
  // <TabNav tabTitles={arr}>
  //   <div>
  //     <p>1111111</p>
  //     <p>1111111</p>
  //     <p>1111111</p>
  //     <p>1111111</p>
  //     <p>1111111</p>
  //   </div>
  //   <div>
  //     <p>2222222</p>
  //     <p>2222222</p>
  //     <p>2222222</p>
  //     <p>2222222</p>
  //     <p>2222222</p>
  //     <p>2222222</p>
  //   </div>
  // </TabNav>
}
