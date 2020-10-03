import React from 'react';
import "./ReportList.css";
import ReportItem from "../reportitem/ReportItem";

const ReportList = ({users,tasks}) => {

    return (
        <div className="report_list">
          <ul>
            {
              users.map((element)=>(
                <li style={{paddingTop:"1.5rem"}}>
                  <ReportItem member={element} tasks={tasks}/>
                </li>
              ))
            }
          </ul>
      </div>
    )
}

export default ReportList
