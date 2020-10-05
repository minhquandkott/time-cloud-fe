import React, {useState} from 'react';
import "./ReportItem.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Collapse from "../../../components/collapse/Collapse";


const ReportItem = ({member,tasks}) => {
    const [isDisplay, setIsDisplay] =  useState(false);
    console.log(isDisplay)
    return (
        <div className="report_item">
            <div className="report_item__header">
                <h2 >{member.name}</h2>
                <h3>{member.time}</h3>
            </div>
            <div className="report_item__content" style={{height: isDisplay? "": "0"}}>
                    {
                        tasks.filter((element)=>element.createdBy===member.id).map((element)=>(
                            <div className="report_item__content__items">
                            <h2>{element.name}</h2>
                            <div></div>
                            <h3>{element.time}</h3>
                            </div>
                        ))
                    }
            </div>     
        </div>
    )
}

export default ReportItem;
