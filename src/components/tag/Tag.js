import "./Tag.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, Transition } from "react-transition-group";
import CloseIcon from "@material-ui/icons/Close";

const Tag = ({
  data = [],
  convertData = () => {},
  children,
  onRemoveItem,
  cssTag,
}) => {
  const [isShow, setIsShow] = useState(true);
  const show = (node) => {
    node.style.maxWidth = node.scrollWidth + "px";
    node.style.opacity = "1";
    node.style.marginRight = "0.3rem";
    node.style.paddingRight = "1.3rem";
    node.style.paddingLeft = "1.3rem";
  };
  const hidden = (node) => {
    node.style.maxWidth = 0;
    node.style.opacity = 0;
    node.style.marginRight = "0";
    node.style.paddingRight = "0";
    node.style.paddingLeft = "0";
  };

  return (
    <div className="tag" style={{ ...cssTag }}>
      {children}
      <TransitionGroup className="tag__content">
        {data.map((ele) => {
          return (
            <Transition
              key={ele.id}
              timeout={1000}
              mountOnEnter
              unmountOnExit
              onEnter={(node) => hidden(node)}
              onEntering={(node) => show(node)}
              onExit={(node) => show(node)}
              onExiting={(node) => hidden(node)}
            >
              {(state) => {
                return (
                  <div className="tag__item">
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
                );
              }}
            </Transition>
          );
        })}
      </TransitionGroup>
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
