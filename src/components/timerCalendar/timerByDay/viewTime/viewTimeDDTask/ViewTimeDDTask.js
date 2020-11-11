import "./ViewTimeDDTask.css";
import React, { useState, useEffect } from "react";
import DropDown2 from "../../../../dropdown2/DropDown2";
import ListProjectTask from "../../../../listProjectTask/ListProjectTask";
import CheckIcon from "@material-ui/icons/Check";
import { connect } from "react-redux";
import { setTimes } from "../../../../../redux/actions";

const ViewTimeDDTask = ({
  isShow,
  onCloseHandler,
  task,
  selectedTime,
  times,
  setTimes,
  projects,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchProjects, setSearchProjects] = useState([]);

  useEffect(() => {
    setSearchProjects(projects);
  }, [projects]);

  const renderFlagTask = (item) => {
    if (task.id === item.id) {
      return (
        <CheckIcon
          style={{
            fontSize: "2rem",
            backgroundColor: "var(--color-button)",
            borderRadius: "50%",
            color: "white",
          }}
        />
      );
    }
  };

  const onInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    const temp = projects.filter((ele) => {
      return ele.name.toLocaleLowerCase().includes(input.toLocaleLowerCase());
    });
    setSearchProjects(temp);
  };

  const renderHeader = () => {
    return (
      <input
        className="view_time_dd_task__input"
        value={searchInput}
        onChange={onInputChange}
        placeholder="Search project..."
      />
    );
  };

  const onTaskClick = (task) => {
    setTimes(
      times.map((ele) => {
        if (ele.id === selectedTime.id) {
          return { ...ele, task };
        }
        return ele;
      })
    );
  };

  return (
    <DropDown2
      renderHeader={renderHeader}
      renderContent={() => (
        <ListProjectTask
          onClickTaskHandler={onTaskClick}
          renderFlagTask={renderFlagTask}
          projects={searchProjects}
        />
      )}
      isShow={isShow}
      onCloseHandler={() => {
        setSearchInput("");
        setSearchProjects(projects);
        onCloseHandler();
      }}
      maxHeight="30rem"
    />
  );
};

const mapStateToProps = (state) => {
  const { selectedTime, times } = state.week;
  const { projects } = state.projects;
  return {
    selectedTime,
    times,
    projects,
  };
};

export default connect(mapStateToProps, { setTimes })(ViewTimeDDTask);
