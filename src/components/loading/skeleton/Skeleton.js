import "./Skeleton.css";
import React from "react";

const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__item skeleton__item__1"></div>
      <div className="skeleton__item skeleton__item__2"></div>
      <div className="skeleton__item skeleton__item__3"></div>
      <div className="skeleton__item skeleton__item__4"></div>
    </div>
  );
};
export default Skeleton;
