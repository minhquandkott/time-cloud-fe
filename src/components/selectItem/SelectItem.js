import "./SelectItem.css";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
const SelectItem = ({ children, onClickHandler = () => {} }) => {
  return (
    <div className="select_item">
      <button
        onClick={(event) => {
          onClickHandler();
        }}
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  );
};

export default SelectItem;
