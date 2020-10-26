import "./Tooltip.css";
import React, { useRef, useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";

const Tooltip = ({
  direction,
  backgroundColor,
  arrowSize,
  css,
  maxWidth,
  children,
  isShow,
}) => {
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);
  const contentRef = useRef(null);
  const [show, setShow] = useState(false);
  const [direc, setDirec] = useState(direction);

  useEffect(() => {
    if (show) {
      const tooltip = tooltipRef.current;
      const arrow = arrowRef.current;
      const pin = tooltipRef.current?.previousElementSibling;
      const html = document?.firstElementChild;
      if (tooltip && arrow && pin) {
        const documentHeight = html.offsetHeight;
        const tooltipHeight = tooltip.offsetHeight;
        const parentOffsetTop = pin.offsetParent.offsetTop;
        const parentOffsetBottom =
          documentHeight - parentOffsetTop + pin.offsetParent.offsetHeight;

        if (parentOffsetTop < tooltipHeight) {
          setDirec("bottom");
        }
        if (parentOffsetBottom < tooltipHeight) {
          setDirec("top");
        }
      }
    }
  }, [show]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setPosition = useCallback(() => {
    const tooltip = tooltipRef.current;
    const arrow = arrowRef.current;
    const pin = tooltipRef.current?.previousElementSibling;
    if (pin === null)
      throw new Error(
        "Can't not find sibling to pin Tooltip ! please add sibling element"
      );
    const html = document?.firstElementChild;

    if (tooltip && arrow && pin) {
      if (html.offsetWidth < pin.offsetLeft + tooltip.offsetWidth / 2) {
        const extraLeft =
          html.offsetWidth - (pin.offsetLeft + tooltip.offsetWidth / 2);
        tooltip.style.left =
          pin.offsetLeft -
          tooltip.offsetWidth / 2 +
          extraLeft -
          pin.offsetWidth +
          "px";
      } else {
        tooltip.style.left =
          pin.offsetLeft - tooltip.offsetWidth / 2 + pin.offsetWidth / 2 + "px";
      }
      if (direc === "top") {
        tooltip.style.top =
          pin.offsetTop - arrow.offsetHeight / 2 - tooltip.offsetHeight + "px";
      } else {
        tooltip.style.top =
          pin.offsetTop + pin.offsetHeight + arrow.offsetHeight / 2 + "px";
      }
      arrow.style.left =
        pin.offsetLeft - tooltip.offsetLeft + pin.offsetWidth / 2 + "px";
    }
  });

  useEffect(() => {
    setPosition();
    window.addEventListener("resize", setPosition);
  }, [setPosition]);
  useEffect(() => {
    window.addEventListener("click", (event) => {
      let queryClass = "";
      if (tooltipRef.current) {
        tooltipRef.current.previousElementSibling.classList.forEach(
          (element) => {
            queryClass = queryClass + "." + element;
          }
        );
        const arrChild = document.querySelectorAll(queryClass + " *");
        if (
          [...arrChild, tooltipRef.current.previousElementSibling].some(
            (ele) => ele === event.target
          )
        ) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
    });
  }, [show]);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  return (
    <div
      className="tooltip"
      ref={tooltipRef}
      style={{
        backgroundColor,
        maxWidth,
        display: show ? "initial" : "none",
        ...css,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className={`tooltip__arrow tooltip__arrow__${direc}`}
        ref={arrowRef}
        style={{
          border: `${arrowSize} solid transparent`,
          borderTopColor: direc === "top" ? backgroundColor : "transparent",
          borderBottomColor:
            direc === "bottom" ? backgroundColor : "transparent",
        }}
      ></p>
      <div className="tooltip__content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
Tooltip.propTypes = {
  backgroundColor: PropTypes.string,
  direction: PropTypes.oneOf(["top", "bottom"]),
  arrowSize: PropTypes.string,
  maxWidth: PropTypes.string,
  css: PropTypes.object,
};
Tooltip.defaultProps = {
  backgroundColor: "white",
  direction: "bottom",
  arrowSize: "1rem",
  maxWidth: "15rem",
};
export default Tooltip;
