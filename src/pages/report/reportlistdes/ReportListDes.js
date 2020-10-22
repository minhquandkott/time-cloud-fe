import React, { useEffect, useState } from "react";
import "./ReportListDes.css";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ReportItemDes from "./reportitemdes/ReportItemDes";

const ReportListDes = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    timeCloudAPI()
      .get(`users/${user.id}/times`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newData = [];

  data.filter(function (datum) {
    let i = newData.findIndex((x) => x.description === datum.description);
    if (i <= -1) {
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
        newData.reverse().map((datum) => (
        <ReportItemDes key={datum.id} user={user} data={datum} />
      ))}
    </div>
  );
};

export default ReportListDes;
