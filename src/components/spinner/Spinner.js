import React from "react";
import "./Spinner.css";
import emptyClock from "../../assets/images/empty_clock.svg";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={emptyClock} alt="" />
    </div>
  );
};

export default Spinner;
