import "./TasksForm.css";
import Table from "../../../../components/table/Table";
import SelectItem from "../../../../components/selectItem/SelectItem";
import Checkbox from "../../../../components/checkbox/Checkbox";
import Tag from "../../../../components/tag/Tag";
import React, { useState, useEffect } from "react";
import Tooltip from "../../../../components/tooltip/Tooltip";
import UserInfo from "../../../../components/userInfo/UserInfo";

const TasksForm = ({ selectedMembers, selectedTasks, setSelectedTasks }) => {
  const [selectedTask, setSelectedTask] = useState();

  console.log(selectedMembers);
  const columns = {
    people: {
      key: "action",
      width: "20%",
      convertData: (element) => (
        <SelectItem
          onClickHandler={() =>
            setSelectedTasks(
              selectedTasks.filter((ele) => ele.id !== element.id)
            )
          }
        >
          <p
            style={{
              fontSize: "1.9rem",
              fontWeight: "550",
              textTransform: "capitalize",
            }}
          >
            {element.name}
          </p>
        </SelectItem>
      ),
    },
    visibleTo: {
      key: "name",
      width: "80%",
      convertHeader: () => (
        <p
          style={{
            color: "var(--color-dark-tertiary)",
          }}
        >
          Visible to
        </p>
      ),
      cssHeader: {
        textAlign: "left",
      },
      convertData: (element) => (
        <div style={{ position: "relative" }}>
          <Checkbox id={element.id + ""} showUnCheck={true} checked>
            <span>All</span>
          </Checkbox>
          <Tag data={element.users} convertData={(ele) => ele.user.name}>
            <input
              className="project_form__input toggle_color"
              placeholder="Add a member ..."
              type="text"
              style={{ width: "11rem" }}
            />
            <Tooltip
              maxWidth="35rem"
              css={{
                boxShadow: "var(--box-shadow-secondary)",
                borderRadius: ".5rem",
                padding: ".5rem 0",
              }}
            >
              <div className="members_search__dropdown">
                {selectedMembers?.map((ele) => {
                  return (
                    <div className="members_search__item" key={ele.id}>
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
      ),
    },
  };

  return (
    <div className="tasks_form">
      <Table
        columns={columns}
        data={selectedTasks}
        skeletonLoading={false}
        onClickHandler={(ele) => setSelectedTask(ele)}
      />
    </div>
  );
};

export default TasksForm;
