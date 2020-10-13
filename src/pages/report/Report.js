import React, { useState, useEffect } from "react";
import "./Report.css";
import ReportList from "../../pages/report/reportlist/ReportList";
import ReportListDes from "../../pages/report/reportlistdes/ReportListDes";
import TabNav from "../../components/tabNav/TabNav";
import TimeCloudAPI from "../../apis/timeCloudAPI";
import {convertSecondToHour} from "../../utils/Utils";
import Avatar from "../../components/avatar/Avatar";
import history from "../../history/"; 

const Report = () => {

  const tabTitles = ["By Projects", "By Tasks"];
  const [time,setTime] = useState([]);
  const [user,setUser] = useState([]);

  useEffect(()=>{
    TimeCloudAPI().get(`users/77/total-times`).then(response=>{
      setTime(response.data);
    }).catch(error=>{});
  },[])

  useEffect(()=>{
    TimeCloudAPI().get(`users/77`).then(response=>{
      setUser(response.data);
    }).catch(error=>{});
  },[])

  return (
    <div className="report">
      <div className="report_title">
        <h2>Report</h2>
      </div>
      <div className="report_user">
        <Avatar avatar={user.avatar} avatarSize="10rem">
          <div className="report_user_avatarInfo">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          </div>
        </Avatar>
        <div className="report_user_hour">
          <h2>{convertSecondToHour(time)+"h"}</h2>
          <p>hour tracked</p>
        </div>
      </div>
      <div className="report_body">
        <TabNav tabTitles={tabTitles}>
          <div>
            <ReportList user={user}/>
          </div>
          <div>
            <ReportListDes user={user}/>
          </div>
        </TabNav>
      </div>
   </div>
  );
};

export default Report;
