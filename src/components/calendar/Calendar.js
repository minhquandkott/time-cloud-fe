import "./Calendar.css";

import React, { useState, useEffect } from "react";
import {
  getDaysOfWeek,
  days,
  months,
  get50Years,
  equalDates,
} from "../../utils/Utils";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CalendarDDMonth from "./calendarDDMonth/CalendarDDMonth";
import CalendarDDYear from "./calendarDDYear/CalendarDDYear";
import DropDown2 from "../dropdown2/DropDown2";
import { v4 } from "uuid";

const Calendar = ({
  onSelectDay = () => {},
  value = [],
  multipleSelect = false,
  conditionDisable = () => {},
}) => {
  const [daysOfMouth, setDaysOfMouth] = useState([]);
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [showDDMonth, setShowDDMonth] = useState(false);
  const [showDDYear, setShowDDYear] = useState(false);
  const [years, setYears] = useState([]);
  const [selectedDays, setSelectedDays] = useState(value);

  useEffect(() => {
    if (!showDDYear) {
      setYears(get50Years(new Date().getFullYear() - 25));
    }
  }, [showDDMonth, showDDYear]);

  const getDaysOfMouth = (mouth, year) => {
    var firstDay = new Date(year, mouth - 1, 1);
    var lastDay = new Date(year, mouth, 0);
    setFirstDay(firstDay);
    setLastDay(lastDay);
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

  const isOutOfMonth = (date) => {
    if (date - firstDay < 0 || date - lastDay > 0) {
      return true;
    }
    return false;
  };
  const isMondayOrSunday = (date) => {
    if (date.getDay() === 1 || date.getDay() === 0) {
      return true;
    }
    return false;
  };

  const onMonthChange = (month) => {
    getDaysOfMouth(month, firstDay.getFullYear());
    setShowDDMonth(false);
  };

  const onYearChange = (year) => {
    getDaysOfMouth(firstDay.getMonth(), year);
    setShowDDYear(false);
  };

  const onDDYearScrollHandler = (e) => {
    const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - Math.ceil(scrollTop) - offsetHeight === 0) {
      e.currentTarget.scroll({
        top: 10,
        behavior: "smooth",
      });
      setYears(get50Years(years[45]));
    } else if (scrollTop === 0 && years[0] > 1970) {
      e.currentTarget.scroll({
        top: scrollHeight - offsetHeight - 1,
        behavior: "smooth",
      });
      setYears(get50Years(years[5] - 50));
    }
  };

  const onDayClick = (date) => {
    if (!conditionDisable(date)) {
      const index = selectedDays?.findIndex((ele) => equalDates(ele, date));
      let temp = [];
      if (index === -1) {
        if (multipleSelect) {
          temp = [...selectedDays, date];
        } else {
          temp = [date];
        }
      } else {
        temp = [...selectedDays];
        temp.splice(index, 1);
      }
      setSelectedDays(temp);
      onSelectDay(temp);
    }
  };

  useEffect(() => {
    let date;
    if (selectedDays.length) {
      date = new Date(selectedDays[0]);
    } else {
      date = new Date();
    }
    getDaysOfMouth(date.getMonth() + 1, date.getFullYear());
    setYears(get50Years(new Date().getFullYear() - 25));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!daysOfMouth.length) return null;
  return (
    <div
      className="calendar"
      onClick={() => {
        setShowDDMonth(false);
        setShowDDYear(false);
      }}
    >
      <div className="calendar__header">
        <button onClick={() => onPreButtonClick()}>
          <ChevronLeftIcon />
          {months[firstDay.getMonth() - 1]}
        </button>
        <div className="calendar__header__middle">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowDDMonth(true);
              setShowDDYear(false);
            }}
          >
            {months[firstDay.getMonth()]}
            <DropDown2
              isShow={showDDMonth}
              onCloseHandler={() => setShowDDMonth(false)}
              renderContent={() => (
                <CalendarDDMonth
                  selectedMonth={firstDay.getMonth()}
                  onClickHandler={onMonthChange}
                />
              )}
              maxHeight="15rem"
              css={{
                transform: "translateX(-20%) translateY(102%)",
                padding: "0",
                boxShadow: "1px 1px 6px rgba(0,0,0,.5)",
              }}
            />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowDDMonth(false);
              setShowDDYear(true);
            }}
          >
            {firstDay.getFullYear()}
            <DropDown2
              isShow={showDDYear}
              onScrollHandler={onDDYearScrollHandler}
              onCloseHandler={() => setShowDDYear(false)}
              renderContent={() => (
                <CalendarDDYear
                  selectedYear={parseInt(firstDay.getFullYear())}
                  onClickHandler={onYearChange}
                  years={years}
                />
              )}
              maxHeight="15rem"
              css={{
                transform: "translateX(-18%) translateY(102%)",
                padding: "0",
                boxShadow: "1px 1px 6px rgba(0,0,0,.5)",
              }}
            />
          </div>
        </div>
        <button onClick={() => onNextButtonClick()}>
          {months[firstDay.getMonth() + 1]}
          <ChevronRightIcon />
        </button>
      </div>
      <div className="calendar__content">
        <div className="calendar__title">
          {days.map((ele, index) => (
            <span key={index}>{ele}</span>
          ))}
        </div>
        <div className="calendar__days">
          {daysOfMouth.map((ele, index) => {
            const className = `${
              equalDates(new Date(), ele) ? "current_day" : ""
            } ${isOutOfMonth(ele) ? "out_of_month" : ""} ${
              isMondayOrSunday(ele) ? "mon_sun" : ""
            } ${
              selectedDays?.some((day) => equalDates(day, ele)) ? "active" : ""
            } ${conditionDisable(ele) ? "disable" : ""}`;
            return (
              <span
                key={v4()}
                className={className}
                onClick={() => onDayClick(ele)}
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
