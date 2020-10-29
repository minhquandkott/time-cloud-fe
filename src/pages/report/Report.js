import React, { useState, useEffect } from "react";
import "./Report.css";
import ReportList from "../../pages/report/reportlist/ReportList";
import ReportListDes from "../../pages/report/reportlistdes/ReportListDes";
import TabNav from "../../components/tabNav/TabNav";
import TimeCloudAPI from "../../apis/timeCloudAPI";
import { convertSecondToHour,convertTime } from "../../utils/Utils";
import Avatar from "../../components/avatar/Avatar";
import history from "../../history/";
import PageDesign from "../../components/pageDesign/PageDesign";
import ChartDoughnut from "../../components/chartdoughnut/ChartDoughnut";
import timeCloudAPI from "../../apis/timeCloudAPI";

const Report = () => {
  const tabTitles = ["By Projects", "By Times"];
  const [time, setTime] = useState(null);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [timeUsers, setTimeUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    TimeCloudAPI()
      .get(`users/${history.location.state}/total-times`)
      .then((response) => {
        if (isMounted) setTime(response.data);
      })
      .catch((error) => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    TimeCloudAPI()
      .get(`users/${history.location.state}`)
      .then((response) => {
        if (isMounted) setUser(response.data);
      })
      .catch((error) => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchProject = async() => {
    const res = await TimeCloudAPI()
      .get(`users/${history.location.state}/project-users`)
  
    setProjects(res.data);
  }

  useEffect(() => {  
    fetchProject()
  }, []);

  useEffect(() => {
    Promise.all(projects.map(project => TimeCloudAPI().get(`projects/${project.project.id}/users/${history.location.state}/total-times`)))
      .then(res => {
        const temp = res.map(ele => convertTime(ele.data))
        setTimeUsers(temp)
      });
      
  }, [projects])

  let labels = projects.map(project => project.project.name);
  let label = "Time (Hour)";
  let color = projects.map(project => project.project.color);

  console.log(timeUsers);
  let datasets = {
    label:label,
    color:color,
    data: timeUsers
  };

  

  return (
    <PageDesign title="Report">
      <div className="report_user">
        <div className="page_design__animate__left">
          <Avatar avatar={user?.avatar} avatarSize="10rem">
            <div className="report_user_avatarInfo">
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </div>
          </Avatar>
        </div>

        <div className="report_user_hour page_design__animate__right">
          <h2>{convertSecondToHour(time)}</h2>
          <p>hour tracked</p>
        </div>
      </div>

      <div className='report_chart_body'>
      <div className="report_chart">
      <ChartDoughnut labels={labels} datasets={datasets}/>
      </div>
      <div className="report_body">
        {user ? (
          <TabNav tabTitles={tabTitles}>
            <div>
              <ReportList user={user} />
            </div>
            <div>
              <ReportListDes user={user} />
            </div>
          </TabNav>
        ) : null}
      </div>
      </div>
    </PageDesign>
  );
};

export default Report;
