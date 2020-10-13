import "./NotFound.css";
import { Link } from "react-router-dom";
import React from "react";

const NotFound = () => {
  return (
    <div className="not_found">
      <p className="not_found__404">404</p>
      <p className="not_found__info">
        <p>Opp!</p>
        The page you are looking for don't exist
      </p>
      <Link to="/timer" className="not_found__button">
        Back to Home
      </Link>
    </div>
  );
};
export default NotFound;
