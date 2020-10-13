import React,{useEffect,useState} from 'react';
import "./ReportItemDes.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import {convertSecondToHour} from "../../../../utils/Utils";

const ReportItemDes = ({user,data}) => {

    const [time,setTime] = useState([]);

    useEffect(()=>{
        timeCloudAPI().get(`/users/${user.id}/description/${data.description}/total-times`).then(response=>{
            console.log(response);
            setTime(response.data)
        }).catch(error=>{})
    },[]);

    return (
        <div>
        <div className="report_item_des">
            <h2>{data.description}</h2>
            <h3>{data.task.name} - {data.task.project.name} ({data.task.project.clientName})</h3>
            <p>{convertSecondToHour(time)+"h"}</p>
        </div>
        </div>
    )
}

export default ReportItemDes
