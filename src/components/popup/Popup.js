import React from "react";
import PropTypes from "prop-types";
import "./Popup.css";

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="popup__title">
        <p className="title">title</p>
      </div>
      <div className="popup__content">
        <p>abc</p>
        <p>abc</p>
        <p>abc</p>
        <p>abc</p>
      </div>
    </div>
  );
};

Popup.propTypes = {};

export default Popup;
