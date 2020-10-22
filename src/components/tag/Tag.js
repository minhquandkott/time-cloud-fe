import "./Tag.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

const Tag = ({
  data = [],
  convertData = () => {},
  children,
  onRemoveItem,
  cssTag,
}) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div className="tag" style={{ ...cssTag }}>
      {children}
      <div>
        {data.map((ele) => (
          <div className="tag__item" key={ele.id}>
            {convertData(ele)}
            <button
              onClick={() => {
                setIsShow(!isShow);
                onRemoveItem(ele.id);
              }}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
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
  cssTag: PropTypes.object,
};
