import React,{useEffect,useState} from 'react';
import "./ReportAdmin.css";
import TimeCloudAPI from "../../../apis/timeCloudAPI";
import ReportAdminUserItem from "./reportadminuseritem/ReportAdminUserItem";
import ReportAdminProjectItem from "./reportadminprojectitem/ReportAdminProjectItem";

const ReportAdmin = () => {
    
    const [users,setUsers] = useState([]);
    const [project,setProjects] = useState([]);
    
    let newUsers = [];

    useEffect(()=>{
        TimeCloudAPI().get(`companies/52/users`).then(response=>{
            setUsers(response.data.map(res=>res.user));
        }).catch((error)=>{});
    },[]);

    useEffect(()=>{
        TimeCloudAPI().get(`companies/52/projects`).then(response=>{
            setProjects(response.data);
        }).catch((error)=>{});
    },[]);
    
    users.filter(function (user) {
        let i = newUsers.findIndex((x) => x.id === user.id);
        if (i <= -1) {
          newUsers.push(user);
        }
        return null;
      });

    return (
        <div className="report_admin">
            <div className="report_admin_user">
                <h1>People</h1>
                <div className="report_admin_user_header">
                <h1>Names</h1>
                <p>Hours</p>
                </div>
            </div>
            {
                newUsers.map(user=>(
                    <ReportAdminUserItem key={user.id} user={user}/>
                ))
            }

            <div className="report_admin_project">
                <h1>Projects</h1>
                <div className="report_admin_project_header">
                <h1>Names</h1>
                <p>Hours</p>
                </div>
            </div>
            {
                project.map(project=>(
                    <ReportAdminProjectItem key={project.id} project={project}/>
                ))
            }
        </div>
    )
}

export default ReportAdmin;
