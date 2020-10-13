import React,{useEffect,useState} from 'react'
import "./ReportItemTask.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import Ultils, { convertSecondToHour } from "../../../../utils/Utils";
import "./ReportItemTask.css";

const ReportItemTask = ({user,task}) => {
    const [time,setTime] = useState([]);

    useEffect(() => {
    timeCloudAPI().get(`tasks/${task.id}/users/${user.id}/total-times`).then(response => {
            console.log(response)
            setTime(response.data);
        }).catch(error => {})
    },[]);

    return (
        <div className="report_item_task">
            <h2>{task.name}</h2>
            <div></div>
            <p>{convertSecondToHour(time)+"h"}</p>
        </div>
    )
}

export default ReportItemTask;
