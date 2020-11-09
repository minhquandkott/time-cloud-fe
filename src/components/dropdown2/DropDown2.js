import "./DropDown2.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

const DropDown2 = ({
  renderHeader = () => {},
  renderContent = () => {},
  isShow,
  onCloseHandler = () => {},
  maxHeight,
  css,
}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setShow(isShow);
  }, [isShow, setShow]);

  const onClickHandler = useCallback(
    (event) => {
      if (
        event.target !== dropdownRef.current &&
        !dropdownRef.current?.contains(event.target)
      ) {
        onCloseHandler();
      }
    },
    [onCloseHandler]
  );

  useEffect(() => {
    if (show) window.addEventListener("click", onClickHandler);
    return () => {
      window.removeEventListener("click", onClickHandler);
    };
  }, [onClickHandler, show]);
  return (
    show && (
      <div
        className="drop_down_2"
        ref={dropdownRef}
        style={{ maxHeight: maxHeight, ...css }}
      >
        {renderHeader()}
        {renderContent()}
      </div>
    )
  );
};

export default DropDown2;
