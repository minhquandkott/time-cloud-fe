import "./Point.css";
import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PropTypes from "prop-types";

const Point = (props) => {
  const { pointSize, color, title, css, cssTittle } = props;
  return (
    <div className="point" style={{ ...css }}>
      <FiberManualRecordIcon
        style={{
          fontSize: `${pointSize ? pointSize : "10px"}`,
          color: `${color}`,
        }}
      />
      {title ? (
        <p className="title" style={{ ...cssTittle }}>
          {title}
        </p>
      ) : null}

      {props.children}
    </div>
  );
};

export default Point;

Point.propTypes = {
  color: PropTypes.string,
  pointSize: PropTypes.string,
  title: PropTypes.string.isRequired,
  css: PropTypes.object,
  cssTittle: PropTypes.object,
};
