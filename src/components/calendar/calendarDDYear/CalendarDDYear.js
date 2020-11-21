import "./CalendarDDYear.css";
import React, { useRef, useEffect } from "react";
import { v4 } from "uuid";

const CalendarDDYear = ({ onClickHandler, selectedYear, years }) => {
  const selectedYearRef = useRef(null);

  useEffect(() => {
    if (selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  }, []);

  const onSpanClick = (year) => {
    onClickHandler(year);
  };
  return (
    <div className="calendar_dd_month" onClick={(e) => e.stopPropagation()}>
      {years.map((ele) => {
        return (
          <span
            key={v4()}
            onClick={() => onSpanClick(ele)}
            ref={ele === selectedYear ? selectedYearRef : null}
            style={{
              backgroundColor: ele === selectedYear ? "#0066CC" : "initial",
            }}
          >
            {ele}
          </span>
        );
      })}
    </div>
  );
};

export default CalendarDDYear;
