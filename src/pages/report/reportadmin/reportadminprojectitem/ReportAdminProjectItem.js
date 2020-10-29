import React,{useEffect,useState} from 'react'
import "./ReportAdminProjectItem.css";
import TimeCloudAPI from "../../../../apis/timeCloudAPI";
import {convertSecondToHour} from "../../../../utils/Utils";
import history from "../../../../history/index";

const ReportAdminUserItem = ({project}) => {

    const [time,setTime] = useState(null);

    useEffect(()=>{
        TimeCloudAPI().get(`projects/${project.id}/total-times`).then(response=>{
            setTime(response.data);
        }).catch(error=>{});
    });

    function toProjectReportPage() {
        console.log(project);
        history.push({
            pathname:`/projects/${project.id}`,
            state:project
        })
    }

    return (
        <div className="report_admin_project_item" onClick={toProjectReportPage}>
            <div className="report_admin_project_name">
                <div className="report_admin_project_color" 
                    style={{height:"30px",
                    width:"30px", 
                    background:`${project.color}`, 
                    borderRadius:"15px 50px 50px 15px"}}></div>
                <h2>{project.name}</h2>
                <h3>({project.clientName})</h3>
             </div>
            <p>{convertSecondToHour(time)+"h"}</p>
        </div>
    )
}

export default ReportAdminUserItem
