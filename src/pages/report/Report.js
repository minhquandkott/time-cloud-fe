import React, { useState, useEffect } from "react";
import "./Report.css";
import ReportList from "../../pages/report/reportlist/ReportList";
import ReportListDes from "../../pages/report/reportlistdes/ReportListDes";
import TabNav from "../../components/tabNav/TabNav";
import TimeCloudAPI from "../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../utils/Utils";
import Avatar from "../../components/avatar/Avatar";
import history from "../../history/";
import PageDesign from "../../components/pageDesign/PageDesign";

const Report = () => {
  const tabTitles = ["By Projects", "By Times"];
  const [time, setTime] = useState(null);
  const [user, setUser] = useState(null);

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
          <h2>{convertSecondToHour(time) + "h"}</h2>
          <p>hour tracked</p>
        </div>
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
    </PageDesign>
  );
};

export default Report;
