import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./CollapseItem.css";
import PropTypes from "prop-types";

const CollapseItem = ({
  children,
  onSelectCollapseItem,
  selectedEleRef,
  id,
}) => {
  const [showContent, setShowContent] = useState(false);
  const collapseItemRef = useRef(null);
  const className = `collapse_item_${id}`;

  const onButtonClick = () => {
    setShowContent(!showContent);

    if (!showContent) {
      onSelectCollapseItem(collapseItemRef);
    }
  };

  useEffect(() => {
    const toggleItems = document.querySelectorAll(`.${className} .toggle_item`);
    const reverseToggleItems = document.querySelectorAll(
      `.${className} .toggle_item.reverse`
    );

    if (showContent) {
      toggleItems.forEach((toggleItem) => {
        toggleItem.style.maxHeight = toggleItem.scrollHeight + "px";
        toggleItem.style.opacity = "1";
      });
      reverseToggleItems.forEach((reverseToggleItem) => {
        reverseToggleItem.style.maxHeight = "0";
        reverseToggleItem.style.opacity = "0";
      });
    } else {
      toggleItems.forEach((toggleItem) => {
        toggleItem.style.maxHeight = "0";
        toggleItem.style.opacity = "0";
      });
      reverseToggleItems.forEach((reverseToggleItem) => {
        reverseToggleItem.style.maxHeight =
          reverseToggleItem.scrollHeight + "px";
        reverseToggleItem.style.opacity = "1";
      });
    }
  });

  useEffect(() => {
    if (selectedEleRef !== collapseItemRef) {
      setShowContent(false);
    }
  }, [selectedEleRef]);

  return (
    <div className={`${className} collapse_item`} ref={collapseItemRef}>
      <button
        onClick={(event) => onButtonClick(event)}
        className="collapse_item__button"
      >
        {showContent ? <RemoveIcon /> : <AddIcon />}
      </button>
      {children}
    </div>
  );
};

export default CollapseItem;

CollapseItem.propTypes = {
  id: PropTypes.number.isRequired,
};
