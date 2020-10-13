import "./Tag.css";
import React, { useState } from "react";
import TagItem from "./tagItem/TagItem";

const Tag = () => {
  return (
    <div className="tag">
      <TagItem />
      <TagItem />
      <TagItem />
    </div>
  );
};

export default Tag;
