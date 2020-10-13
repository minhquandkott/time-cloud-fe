import React, { useEffect, useState } from "react";
import "./ReportList.css";
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ReportItem from "../reportitem/ReportItem";

const ReportList = ({ user }) => {
  const [projects, setProjects] = useState([]);
  console.log(user);
  useEffect(() => {
    timeCloudAPI()
      .get(`users/${user.id}/projects`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {});
  }, [user.id]);

  return (
    <div className="reportList">
      <Collapse selectMultiple={true}>
        {projects.map((project) => (
          <ReportItem project={project} user={user} key={project.id} />
        ))}
      </Collapse>
    </div>
  );
};

export default ReportList;
