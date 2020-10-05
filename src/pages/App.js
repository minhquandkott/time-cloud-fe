import React from "react";
import "./App.css";
import "../assets/css/animation.css";
import { Router as BrowserRouter } from "react-router-dom";
import history from "../history";
import Router from "./Router";
import Collapse from "../components/collapse/Collapse";
import UserInfo from "../components/userInfo/UserInfo";
import TabNav from "../components/tabNav/TabNav";


const arr = ["Tasks", "Team"];
const tasks = [{name: "task1"},{name: "task1"}]
const teams = [{name: "t1"},{name: "t2"}]
function App() {
  const taskC = (
    <div>
      <Collapse selectMultiple={true}>
        {tasks.map(task => (
          <div>
            <div>Header</div>
            <div className="toggle_item">
              <p>{task.name}</p>
              <p>{task.name}</p>
              <p>{task.name}</p>
              <p>{task.name}</p>
              <p>{task.name}</p>
            </div>
          </div>
        ))}
      </Collapse>
    </div>
  )
  const teamC = (
    <div>
      <p>Team</p>
    </div>
  )
  return (
    <div className="app">
      {/* <BrowserRouter history={history}>
        <Router />
      </BrowserRouter> */}
      <TabNav tabTitles={arr}>
        {taskC}
        {teamC}
      </TabNav>
      
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
