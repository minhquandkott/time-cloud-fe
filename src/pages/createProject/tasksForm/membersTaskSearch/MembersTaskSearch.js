import "./MembersTaskSearch.css";
import React, { useState, useEffect, useRef } from "react";
import Checkbox from "../../../../components/checkbox/Checkbox";
import Tag from "../../../../components/tag/Tag";
import Tooltip from "../../../../components/tooltip/Tooltip";
import UserInfo from "../../../../components/userInfo/UserInfo";
import { v4 } from "uuid";

const MembersTaskSearch = ({
  data,
  members,
  onMemberSelected,
  onMemberRemove,
  selectedTask,
  onAddAllMember,
  onRemoveAllMember,
}) => {
  const [selectedData, setSelectedData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const checkboxDirty = useRef(false);
  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (!members.length) {
      setCheckboxChecked(false);
    }
  }, [members]);

  useEffect(() => {
    let maxResult = 4;
    const arr = members.filter((ele) => {
      if (inputValue) {
        return (
          (ele.user.name
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase()) ||
            ele.user.email
              .toLocaleLowerCase()
              .includes(inputValue.toLocaleLowerCase())) &&
          !selectedTask.users?.some((e) => e.id === ele.id)
        );
      } else {
        if (
          maxResult > 0 &&
          !selectedTask?.users?.some((e) => e.id === ele.id)
        ) {
          maxResult--;
          return true;
        } else {
          return false;
        }
      }
    });
    setSelectedData([...arr]);
  }, [inputValue, members, selectedTask]);
  const [showTooltip, setShowTooltip] = useState(false);
  const onCheckboxChanged = (event) => {
    checkboxDirty.current = true;
    event.target.checked ? setCheckboxChecked(true) : setCheckboxChecked(false);
  };
  useEffect(() => {
    if (checkboxDirty.current) {
      checkboxChecked ? onAddAllMember(data) : onRemoveAllMember(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, checkboxChecked, data]);

  return (
    <div className="members_task_search">
      <Checkbox
        id={v4() + ""}
        showUnCheck={true}
        onCheckboxChanged={onCheckboxChanged}
      >
        <span>All</span>
      </Checkbox>
      <Tag
        data={data.users}
        convertData={(ele) => ele.user?.name}
        onRemoveItem={(eleId) => {
          onMemberRemove(eleId, data);
        }}
        cssTag={{ position: "relative" }}
      >
        <input
          className="project_form__input toggle_color"
          placeholder="Add a member ..."
          type="text"
          style={{ width: "11rem" }}
          onFocus={() =>
            selectedTask?.id === data?.id
              ? setShowTooltip(true)
              : setShowTooltip(false)
          }
          value={inputValue}
          onChange={onInputChange}
          maxLength="20"
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
          <div className="members_search__dropdown">
            {selectedData?.map((ele) => {
              return (
                <div
                  className="members_search__item"
                  key={ele.id}
                  onClick={() => {
                    onMemberSelected(ele, data);
                    setShowTooltip(false);
                    setInputValue("");
                  }}
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
      </Tag>
    </div>
  );
};
export default MembersTaskSearch;
