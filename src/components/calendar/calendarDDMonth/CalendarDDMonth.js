import "./CalendarDDMonth.css";
import React, { useRef, useEffect } from "react";
import { months } from "../../../utils/Utils";

const CalendarDDMonth = ({ selectedMonth, onClickHandler }) => {
  const selectedMonthRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    if (selectedMonthRef.current) {
      selectedMonthRef.current.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  }, []);

  const onSpanClick = (month) => {
    onClickHandler(month);
  };
  return (
    <div
      className="calendar_dd_month"
      onClick={(e) => e.stopPropagation()}
      ref={parentRef}
    >
      {months.map((ele, index) => {
        return (
          <span
            key={index}
            ref={index === selectedMonth ? selectedMonthRef : null}
            onClick={() => onSpanClick(index + 1)}
            style={{
              backgroundColor: selectedMonth === index ? "#0066CC" : "initial",
            }}
          >
            {ele}
          </span>
        );
      })}
    </div>
  );
};

export default CalendarDDMonth;
