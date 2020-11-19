import React, { useEffect, useState } from "react";
import "./ReportItemTask.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../../utils/Utils";
import "./ReportItemTaskDid.css";

const ReportItemTaskDid = ({ user, task }) => {
  const [time, setTime] = useState([]);

  useEffect(() => {
    let isMounted = true;
    timeCloudAPI()
      .get(`tasks/${task.id}/users/${user.id}/total-times`)
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
    <div className="report_item_task">
      <h2>{task.name}</h2>
      <h3 className="report_item__task_name_isDone"
                  style={{
                          background:"rgb(204, 13, 13)", 
                          borderRadius:"15px 15px 15px 15px",}}>Old Task</h3>
      <div></div>
      <p>{convertSecondToHour(time) + "h"}</p>
      
    </div>
  );
};

export default ReportItemTaskDid;