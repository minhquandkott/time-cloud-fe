import "./Calendar.css";

import React, { useState } from "react";
import { getDaysOfWeek, days, months } from "../../utils/Utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DropDown2 from "../dropdown2/DropDown2";

const Calendar = () => {
  const [daysOfMouth, setDaysOfMouth] = useState([]);
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const getDaysOfMouth = (mouth, year) => {
    var firstDay = new Date(year, mouth - 1, 1);
    var lastDay = new Date(year, mouth, 0);
    setFirstDay(firstDay);
    setLastDay(lastDay);
    console.log(firstDay.toDateString(), lastDay.toDateString());
    const result = [];
    for (let i = 0; i < 6; i++) {
      const temp = new Date(firstDay);
      temp.setDate(temp.getDate() + i * 7);
      result.push(...getDaysOfWeek(temp));
    }
    setDaysOfMouth(result);
  };

  const onPreButtonClick = () => {
    getDaysOfMouth(firstDay.getMonth(), firstDay.getFullYear());
  };
  const onNextButtonClick = () => {
    getDaysOfMouth(lastDay.getMonth() + 2, firstDay.getFullYear());
  };

  const conditionDisable = (date) => {
    if (date - firstDay < 0 || date - lastDay > 0) {
      return true;
    }
    return false;
  };

  useState(() => {
    const date = new Date();
    getDaysOfMouth(date.getMonth() + 1, date.getFullYear());
  }, []);
  if (!daysOfMouth.length) return null;
  return (
    <div className="calendar">
      <div className="calendar__header">
        <button onClick={() => onPreButtonClick()}>
          <ArrowBackIosIcon />
        </button>
        <div className="calendar__header__middle">
          <span>{months[firstDay.getMonth()]}</span>
          <span> </span>
          <span>{firstDay.getFullYear()}</span>
        </div>
        <button onClick={() => onNextButtonClick()}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <div className="calendar__content">
        <div className="calendar__title">
          {days.map((ele) => (
            <span>{ele}</span>
          ))}
        </div>
        <div className="calendar__days">
          {daysOfMouth.map((ele, index) => {
            const className = `${conditionDisable(ele) ? "disable" : ""} ${
              index === selectedIndex ? "active" : ""
            }`;
            return (
              <span
                onClick={() => setSelectedIndex(index)}
                className={className}
              >
                {ele.getDate()}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
