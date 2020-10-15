import React,{useEffect,useState} from 'react'
import "./ReportAdminUserItem.css";
import TimeCloudAPI from "../../../../apis/timeCloudAPI";
import Avatar from "../../../../components/avatar/Avatar";
import {convertSecondToHour} from "../../../../utils/Utils";

const ReportAdminUserItem = ({user}) => {

    const [time,setTime] = useState(null);

    useEffect(()=>{
        TimeCloudAPI().get(`users/${user.id}/total-times`).then(response=>{
            setTime(response.data);
        }).catch(error=>{});
    });

    function mouse() {
        console.log(user.id);
    }

    return (
        <div className="report_admin_user_item" onClick={mouse}>
        <Avatar avatar={user?.avatar} avatarSize="3rem">
          <div className="report_admin_user_avatarInfo">
            <h2>{user?.name}</h2>
          </div>
        </Avatar>
            <p>{convertSecondToHour(time)+"h"}</p>
        </div>
    )
}

export default ReportAdminUserItem
