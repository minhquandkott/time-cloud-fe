import "./SelectCalendar.css";
import React, { useState, useCallback } from "react";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DropDown2 from "../dropdown2/DropDown2";
import Calendar from "../calendar/Calendar";

const SelectCalendar = ({
  multipleSelect,
  value,
  onSelectDay,
  conditionDisable,
}) => {
  const [showDD, setShowDD] = useState(false);
  const onSelectDayHandler = useCallback(
    (selectedDays) => {
      if (!multipleSelect) setShowDD(false);
      onSelectDay(selectedDays);
    },
    [multipleSelect, onSelectDay]
  );
  return (
    <div className="select_calendar" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setShowDD(true)}>
        <EventNoteIcon />
      </button>
      <DropDown2
        isShow={showDD}
        onCloseHandler={() => setShowDD(false)}
        renderContent={() => (
          <Calendar
            onSelectDay={onSelectDayHandler}
            value={value}
            multipleSelect={multipleSelect}
            conditionDisable={conditionDisable}
          />
        )}
        css={{
          transform: "translateX(0%) translateY(102%)",
          padding: "0",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default SelectCalendar;
