import "./Skeleton.css";
import React from "react";
import PropTypes from "prop-types";

const Skeleton = (props) => {
  const { countItem, heightItem, direction, bgSkeleton } = props;
  let bgContainer, bgItem, classContainer, classItem;
  if (direction === "row") {
    bgContainer = bgSkeleton ? bgSkeleton : "var(--color-light-primary)";
    bgItem = "var(--color-light-tertiary)";
    classContainer = "skeleton__loading";
  } else {
    bgItem = "var(--color-light-primary)";
    bgContainer = bgSkeleton ? bgSkeleton : "var(--color-light-tertiary)";
    classItem = "skeleton__loading";
  }

  return (
    <div
      className={`skeleton ${classContainer}`}
      style={{
        flexDirection: direction ? direction : "row",
        backgroundColor: bgContainer,
      }}
    >
      {Array(countItem)
        .fill(0)
        .map((ele, index) => {
          return (
            <div
              className={`skeleton__item ${classItem}`}
              key={index}
              style={{
                height: heightItem ? heightItem : "2rem",
                backgroundColor: bgItem,
                borderBottom:
                  direction === "column"
                    ? "2px solid var(--color-light-tertiary)"
                    : null,
              }}
            ></div>
          );
        })}
    </div>
  );
};
export default Skeleton;

Skeleton.propTypes = {
  countItem: PropTypes.number,
  heightItem: PropTypes.string,
  direction: PropTypes.oneOf(["column", "row"]),
  bgSkeleton: PropTypes.string,
};
