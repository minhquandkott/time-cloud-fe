import React,{useEffect,useState} from 'react';
import "./ReportList.css";
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ReportItem from "../reportitem/ReportItem";

const ReportList = ({user}) => {

  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    timeCloudAPI().get("users/77/projects").then(response => {
      console.log(response)
      setProjects(response.data);
    }).catch(error => {})
  },[]);

    return (
      <div className="reportList">
      <Collapse selectMultiple={true}>
      {projects.map(project => {
        return (
          <ReportItem project={project} user={user}/>
        )
      })}
     </Collapse>
     </div>
    )
}

export default ReportList
