import "./Tooltip.css";
import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const Tooltip = (props) => {
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);
  const contentRef = useRef(null);

  const { direction, backgroundColor, arrowSize } = props;
  const setPosition = useCallback(() => {
    const tooltip = tooltipRef.current;
    const arrow = arrowRef.current;
    const pin = tooltipRef.current.previousElementSibling;
    if (pin === null)
      throw new Error(
        "Can't not find sibling to pin Tooltip ! please add sibling element"
      );
    const html = document.firstElementChild;

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
    if (direction === "top") {
      tooltip.style.top =
        pin.offsetTop - arrow.offsetHeight / 2 - tooltip.offsetHeight + "px";
    } else {
      tooltip.style.top =
        pin.offsetTop + pin.offsetHeight + arrow.offsetHeight / 2 + "px";
    }
    arrow.style.left =
      pin.offsetLeft - tooltip.offsetLeft + pin.offsetWidth / 2 + "px";
  });

  useEffect(() => {
    setPosition();
    window.addEventListener("resize", setPosition);
  }, [setPosition]);

  return (
    <div
      className="tooltip"
      ref={tooltipRef}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <p
        className={`tooltip__arrow tooltip__arrow__${direction}`}
        ref={arrowRef}
        style={{
          border: `${arrowSize}px solid transparent`,
          borderTopColor: direction === "top" ? backgroundColor : "transparent",
          borderBottomColor:
            direction === "bottom" ? backgroundColor : "transparent",
        }}
      ></p>
      <div className="tooltip__content" ref={contentRef}>
        <p>abc</p>
        <div>
          Notice the use of %PUBLIC_URL% in the tags above. It will be replaced
          with the URL of the `public` folder during the build. Only files
          inside the `public` folder can be referenced from the HTML. Unlike
          "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will work
          correctly both with client-side routing and a non-root public URL.
          Learn how to configure a non-root public URL by running `npm run
          build`.
        </div>
      </div>
    </div>
  );
};
Tooltip.propTypes = {
  backgroundColor: PropTypes.string,
  direction: PropTypes.oneOf(["top", "bottom"]),
  arrowSize: PropTypes.string,
};
Tooltip.defaultProps = {
  backgroundColor: "white",
  direction: "bottom",
  arrowSize: "10",
};
export default Tooltip;
