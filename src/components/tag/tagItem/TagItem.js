import "./TagItem.css";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const TagItem = () => {
  return (
    <div className="tag_item">
      <div className="tag_item__content">
        Hiep
        <button>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default TagItem;
