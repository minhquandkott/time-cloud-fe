import React, { useEffect, useState } from "react";
import "./ReportList.css";
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ReportItem from "../reportitem/ReportItem";

const ReportList = ({ user }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    let isMounted = true;
    timeCloudAPI()
      .get(`users/${user.id}/projects`)
      .then((response) => {
        if (isMounted) setProjects(response.data);
      })
      .catch((error) => {});
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="reportList">
      <Collapse selectMultiple={false}>
        {projects.sort((project1,project2)=>(project1.name<=project2.name?-1:1)).map((project) => (
          <ReportItem project={project} user={user} key={project.id} />
        ))}
      </Collapse>
    </div>
  );
};

export default ReportList;
