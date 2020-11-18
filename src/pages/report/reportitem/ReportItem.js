import React, { useState, useEffect } from "react";
import "./ReportItem.css";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../utils/Utils";
import ReportItemTask from "../../../pages/report/reportitem/reportitemtask/ReportItemTask";
import ReportItemTaskDid from "../../../pages/report/reportitem/reportitemtask/ReportItemTaskDid";

const ReportItem = ({ project, user, isDoing}) => {
  const [tasks, setTasks] = useState([]);
  const [taskDids, setTaskDids] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    let isMounted = true;
    timeCloudAPI()
      .get(`projects/${project.id}/users/${user.id}/tasks`)
      .then((response) => {
        if (isMounted) setTasks(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;
    timeCloudAPI()
      .get(`projects/${project.id}/users/${user.id}/tasks-did`)
      .then((response) => {
        if (isMounted) setTaskDids(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let isMounted = true;
    timeCloudAPI()
      .get(`projects/${project.id}/users/${user.id}/total-times`)
      .then((response) => {
        if (isMounted) setTime(response.data);
      })
      .catch((error) => {});
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="report_item">
      <div className="report_item__project">
        <div className="report_item__project_name">
          <div className="report_item_project_color" 
            style={{height:"30px",
                    width:"30px", 
                    background:`${project.color}`, 
                    borderRadius:"15px 50px 50px 15px"}}></div>
          <h2>{project.name}</h2>
          <h3>({project.clientName})</h3>
            {
              isDoing===false?
              <div className="report_item__project_name_isDone"
                  style={{height:"30px",
                          background:"rgb(204, 13, 13)", 
                          borderRadius:"15px 15px 15px 15px",}}><h3>Old Project</h3></div>:<h3></h3>             
            }
        </div>
        <p>{convertSecondToHour(time) + "h"}</p>
      </div>
      <div className="toggle_item">
        {tasks.sort((task1,task2)=>(task1.name<=task2.name?-1:1)).map((task) => (
          <ReportItemTask key={task.id} user={user} task={task} />
        ))}
        {taskDids.sort((task1,task2)=>(task1.name<=task2.name?-1:1)).map((task) => (
          <ReportItemTaskDid key={task.id} user={user} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ReportItem;
