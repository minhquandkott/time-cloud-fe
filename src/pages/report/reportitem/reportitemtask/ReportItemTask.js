import React, { useEffect, useState } from "react";
import "./ReportItemTask.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../../utils/Utils";
import "./ReportItemTask.css";

const ReportItemTask = ({ user, task }) => {
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
      <div></div>
      <p>{convertSecondToHour(time) + "h"}</p>
    </div>
  );
};

export default ReportItemTask;
