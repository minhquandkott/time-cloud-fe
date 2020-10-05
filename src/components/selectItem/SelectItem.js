import "./SelectItem.css";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
const SelectItem = ({ children }) => {
  return (
    <div className="select_item">
      <button>
        <CloseIcon />
      </button>
      {children}
    </div>
  );
};

export default SelectItem;
