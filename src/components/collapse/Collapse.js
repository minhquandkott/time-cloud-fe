import React, { useState } from "react";
import "./Collapse.css";
import CollapseItem from "./collapseItem/CollapseItem";
import PropTypes from "prop-types";

const Collapse = (props) => {
  const { selectMultiple = false, children } = props;
  const [selectedEleRef, setSelectedEleRef] = useState(null);
  const onSelectCollapseItem = (ref) => {
    setSelectedEleRef(ref);
  };
  return (
    <div className="collapse">
      {children.map((ele, index) => {
        return (
          <CollapseItem
            id={index}
            key={index}
            onSelectCollapseItem={
              !selectMultiple ? onSelectCollapseItem : () => {}
            }
            selectedEleRef={!selectMultiple ? selectedEleRef : null}
          >
            {ele}
          </CollapseItem>
        );
      })}
    </div>
  );
};

export default Collapse;

Collapse.propType = {
  selectMultiple: PropTypes.bool,
};
