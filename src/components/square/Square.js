import "./Square.css";

import React from "react";

const Square = ({ title, color, css, size }) => {
  return (
    <span
      className="square"
      style={{
        backgroundColor: color,
        minWidth: size,
        minHeight: size,
        maxHeight: size,
        maxWidth: size,

        ...css,
      }}
    ></span>
  );
};

export default Square;
