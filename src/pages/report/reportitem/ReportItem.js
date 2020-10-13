import React, {useState,useEffect} from 'react';
import "./ReportItem.css";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import Ultils, { convertSecondToHour } from "../../../utils/Utils";
import ReportItemTask from "../../../pages/report/reportitem/reportitemtask/ReportItemTask";


const ReportItem = ({project,user}) => {

    const [tasks, setTasks] = useState([]);
    const [time,setTime] = useState([]);
  
    useEffect(() => {
      timeCloudAPI().get(`projects/${project.id}/tasks`).then(response => {
        console.log(response)
        setTasks(response.data);
      }).catch(error => {})
    },[]);

    useEffect(() => {
        timeCloudAPI().get(`projects/${project.id}/users/${user.id}/total-times`).then(response => {
          console.log(response)
          setTime(response.data);
        }).catch(error => {})
      },[]);

    return (
        <div className="report_item">
            <div className="report_item__project">
              <div className="report_item__project_name">
                <h2>{project.name}</h2>
                <h3>({project.clientName})</h3>
              </div>
                <p>{convertSecondToHour(time)+"h"}</p>
            </div>
            <div className="toggle_item">
                {
                    tasks.map((task)=>(
                          <ReportItemTask user={user} task={task}/>            
                    ))
                }
            </div>
        </div>
    )
}

export default ReportItem;
