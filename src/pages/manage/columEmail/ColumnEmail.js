import "./ColumnEmail.css";

import React from "react";
import CreateIcon from "@material-ui/icons/Create";

const ColumnEmail = ({ userRole }) => {
  return (
    <div className="column_email ">
      <span>{userRole?.user?.email}</span>
      <button className="visible_hover">
        <CreateIcon
          style={{
            fontSize: "2rem",
            color: "var(--color-dark-tertiary)",
          }}
        />
      </button>
    </div>
  );
};

export default ColumnEmail;
