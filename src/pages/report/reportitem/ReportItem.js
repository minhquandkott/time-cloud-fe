import React, { useState, useEffect } from "react";
import "./ReportItem.css";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../utils/Utils";
import ReportItemTask from "../../../pages/report/reportitem/reportitemtask/ReportItemTask";

const ReportItem = ({ project, user }) => {
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    let isMounted = true;
    timeCloudAPI()
      .get(`projects/${project.id}/tasks`)
      .then((response) => {
        if (isMounted) setTasks(response.data);
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
        </div>
        <p>{convertSecondToHour(time) + "h"}</p>
      </div>
      <div className="toggle_item">
        {tasks.map((task) => (
          <ReportItemTask key={task.id} user={user} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ReportItem;
