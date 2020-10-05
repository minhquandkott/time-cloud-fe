import React, { useState, useEffect } from "react";
import "./Report.css";
import ReportList from "../../pages/report/reportlist/ReportList";
import timeCloudAPI from "../../apis/timeCloudAPI";

const Report = () => {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    timeCloudAPI().get("projects/34/users").then(response => {
      console.log(response)
      setUsers(response.data);
    }).catch(error => {})
  },[]);

  useEffect(() => {
    timeCloudAPI().get("projects/34/tasks").then(response => {
      console.log(response)
      setTasks(response.data);
    }).catch(error => {})
  },[]);


  return (
    <div className="report">
      <h2>Reports</h2>
      <ReportList users={users} tasks={tasks}/>
    </div>
  );
};

export default Report;
