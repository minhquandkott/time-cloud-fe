import "./Tag.css";
import React, { useState, useEffect } from "react";
import TagItem from "./tagItem/TagItem";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

const Tag = ({ data, convertData = () => {}, children }) => {
  const [dataList, setDataList] = useState([]);
  const onRemoveItem = (id) => {
    setDataList(dataList.filter((ele) => ele.id !== id));
  };

  useEffect(() => {
    setDataList(data ? data : []);
  }, [data]);

  return (
    <React.Fragment>
      <TransitionGroup className="tag">
        {dataList.map((ele) => (
          <TagItem
            key={ele.id}
            data={ele}
            onRemoveItem={onRemoveItem}
            convertData={convertData}
          />
        ))}
      </TransitionGroup>
      {children}
    </React.Fragment>
  );
};

export default Tag;

Tag.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired
  ),
  convertData: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func,
};
