import "./ChangeTime.css";

import React from "react";
import { convertHours } from "../../utils/Utils";
import { v4 } from "uuid";

const ChangeTime = ({
  conditionDisable = () => {},
  title,
  onCLickHandler = () => {},
  getTime = () => {},
}) => {
  const changeMins = [5, 10, 20, 30];
  return (
    <div className="change_time">
      <p className="change_time__title">{title}</p>
      <div className="change_time__content">
        {changeMins.map((ele) => {
          const temp = getTime(ele);
          return (
            <button
              key={v4()}
              className={
                conditionDisable(ele) ? "change_time__button__disable" : ""
              }
              onClick={() => {
                if (!conditionDisable(ele)) {
                  onCLickHandler(ele);
                }
              }}
            >
              {ele} min
              <p>at {convertHours(temp.getHours(), temp.getMinutes())}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChangeTime;
