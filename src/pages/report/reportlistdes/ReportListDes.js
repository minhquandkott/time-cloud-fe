import React,{useEffect,useState} from 'react'
import "./ReportListDes.css";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ReportItemDes from './reportitemdes/ReportItemDes';

const ReportListDes = ({user}) => {

    const [data, setData] = useState([]);
  
  useEffect(() => {
    timeCloudAPI().get("users/77/times").then(response => {
      console.log(response)
      setData(response.data);
    }).catch(error => {})
  },[]);

   const newData = [];

   data.filter(function(datum){
    let i = newData.findIndex(x => x.description === datum.description);
    if(i <= -1){
    newData.push(datum);
    }
    return null;
    });

    return (
        <div className="report_list_des">
            <div className="report_list_des_header">
            <h2>Time Entry</h2>
            <h3>Categories - Projects</h3>
            </div>
            {
                newData.map((datum)=>(
                    <ReportItemDes user={user} data={datum}/>
                ))
            }
        </div>
    )
}

export default ReportListDes
