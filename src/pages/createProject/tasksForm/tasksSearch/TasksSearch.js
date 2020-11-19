import "./MembersSearch.css";

import React, { useState, useRef } from "react";
import Tooltip from "../../../../components/tooltip/Tooltip";

const MembersSearch = ({
  value,
  onChangeHandler,
  onKeyupHandler,
  onFocusHandler,

  dataList,
  onSelectItem = () => {},
  selectedMembers,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const searchRef = useRef(null);
  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onDivClick = (ele) => {};

  return (
    <div className="members_search">
      <input
        onFocus={() => setShowTooltip(true)}
        value={inputValue}
        onChange={onInputChange}
        type="text"
        placeholder="Add more people ..."
        className="project_form__input"
        maxLength="30"
      />
      <Tooltip
        maxWidth="35rem"
        css={{
          boxShadow: "var(--box-shadow-secondary)",
          borderRadius: ".5rem",
          padding: ".5rem 0",
        }}
        isShow={showTooltip}
      >
        <div className="members_search__dropdown" ref={searchRef}>
          {dataList.map((ele) => {
            return (
              <div
                className="tasks_search__item"
                key={ele.id}
                onClick={() => onDivClick(ele)}
              >
                {ele.name}
              </div>
            );
          })}
        </div>
      </Tooltip>
    </div>
  );
};

export default MembersSearch;
