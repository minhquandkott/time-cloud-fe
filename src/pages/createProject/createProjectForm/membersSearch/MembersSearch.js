import "./MembersSearch.css";

import React, { useState, useEffect, useRef } from "react";
import UserInfo from "../../../../components/userInfo/UserInfo";
import Tooltip from "../../../../components/tooltip/Tooltip";

const MembersSearch = ({ dataList, onSelectItem = () => {} }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const searchRef = useRef(null);
  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onDivClick = (ele) => {
    onSelectItem(ele);
    setInputValue("");
    setShowTooltip(false);
  };

  useEffect(() => {
    const arr = dataList.filter((ele) => {
      return inputValue
        ? ele.user.name
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase()) ||
            ele.user.email
              .toLocaleLowerCase()
              .includes(inputValue.toLocaleLowerCase())
        : false;
    });
    setSelectedData([...arr]);
  }, [dataList, inputValue]);

  return (
    <div className="members_search">
      <input
        onFocus={() => setShowTooltip(true)}
        value={inputValue}
        onChange={onInputChange}
        type="text"
        placeholder="Add more people ..."
        className="project_form__input"
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
          {selectedData?.map((ele) => {
            return (
              <div
                className="members_search__item"
                key={ele.id}
                onClick={() => onDivClick(ele)}
              >
                <UserInfo
                  primaryInfo={ele.user.name}
                  secondaryInfo={ele.user.email}
                />
              </div>
            );
          })}
        </div>
      </Tooltip>
    </div>
  );
};

export default MembersSearch;
