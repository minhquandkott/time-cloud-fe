import "./Point.css";
import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const Point = (props) => {
  return (
    <div className="point">
      <FiberManualRecordIcon
        style={{
          fontSize: `"${props.fontSize}"`,
          color: `"${props.color}"`,
        }}
      />
      <p className="title">{props.title}</p>
    </div>
  );
};

export default Point;
